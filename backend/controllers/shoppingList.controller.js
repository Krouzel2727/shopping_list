import ShoppingList from "../models/shoppingList.model.js";
import User from "../models/user.model.js"; 
// --- CREATE: Vytvoření nového seznamu ---
export const createShoppingList = async (req, res, next) => {
    try {
        const { name } = req.body;

        const newList = await ShoppingList.create({
            name,
            ownerId: req.user._id, // Vlastník je ten, kdo je přihlášen
            members: [],
            items: []
        });

        res.status(201).json({
            success: true,
            data: newList
        });
    } catch (error) {
        next(error);
    }
};

// --- GET ALL: Získat všechny seznamy (kde jsem vlastník nebo člen) ---
export const getShoppingLists = async (req, res, next) => {
    try {
        // Najdi seznamy, kde je uživatel Owner NEBO Member
        const lists = await ShoppingList.find({
            $or: [
                { ownerId: req.user._id },
                { members: req.user._id }
            ]
        }).sort({ createdAt: -1 }); // Seřadit od nejnovějších

        res.status(200).json({
            success: true,
            data: lists
        });
    } catch (error) {
        next(error);
    }
};

// --- GET ONE: Detail seznamu byID---
export const getShoppingList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await ShoppingList.findById(id).populate('ownerId', 'name email').populate('members', 'name email');

        if (!list) {
            const error = new Error('Shopping list not found');
            error.statusCode = 404;
            throw error;
        }

        // Kontrola přístupu: Musím být Owner, Member nebo Admin
        const isOwner = list.ownerId._id.toString() === req.user._id.toString();
        const isMember = list.members.some(member => member._id.toString() === req.user._id.toString());
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isMember && !isAdmin) {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        next(error);
    }
};

// --- UPDATE: Změna názvu ---
export const updateShoppingList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const list = await ShoppingList.findById(id);

        if (!list) {
            const error = new Error('Shopping list not found');
            error.statusCode = 404;
            throw error;
        }

        // Pouze Owner nebo Admin může měnit název
        if (list.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            const error = new Error('Not authorized to update this list');
            error.statusCode = 403;
            throw error;
        }

        list.name = name;
        await list.save();

        res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        next(error);
    }
};

// --- ARCHIVE: Archivace/Odarchivace ---
export const archiveShoppingList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await ShoppingList.findById(id);

        if (!list) {
            const error = new Error('Shopping list not found');
            error.statusCode = 404;
            throw error;
        }

        // Pouze Owner nebo Admin
        if (list.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            const error = new Error('Not authorized to archive this list');
            error.statusCode = 403;
            throw error;
        }

        // Přepnutí stavu (toggle)
        list.archived = !list.archived;
        await list.save();

        res.status(200).json({
            success: true,
            message: `List ${list.archived ? 'archived' : 'unarchived'}`,
            data: list
        });
    } catch (error) {
        next(error);
    }
};

// --- DELETE: Smazání seznamu ---
export const deleteShoppingList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await ShoppingList.findById(id);

        if (!list) {
            const error = new Error('Shopping list not found');
            error.statusCode = 404;
            throw error;
        }

        // Pouze Owner nebo Admin
        if (list.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            const error = new Error('Not authorized to delete this list');
            error.statusCode = 403;
            throw error;
        }

        await list.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Shopping list deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};



// --- MEMBERS: Přidání člena (podle emailu) ---
export const addMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const list = await ShoppingList.findById(id);
        const userToAdd = await User.findOne({ email });

        if (!list) return next(new Error('Shopping list not found'));
        if (!userToAdd) {
            const error = new Error('User with this email not found');
            error.statusCode = 404;
            throw error;
        }

        // Práva: Pouze Owner nebo Admin může přidávat členy
        if (list.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            const error = new Error('Not authorized to add members');
            error.statusCode = 403;
            throw error;
        }

        // Kontrola, zda už není členem (nebo vlastníkem)
        if (list.members.includes(userToAdd._id) || list.ownerId.toString() === userToAdd._id.toString()) {
            const error = new Error('User is already a member or owner');
            error.statusCode = 409; // Conflict
            throw error;
        }

        list.members.push(userToAdd._id);
        await list.save();

        res.status(200).json({ success: true, data: list });
    } catch (error) {
        next(error);
    }
};

// --- MEMBERS: Odebrání člena ---
export const removeMember = async (req, res, next) => {
    try {
        const { id, memberId } = req.params;
        const list = await ShoppingList.findById(id);

        if (!list) return next(new Error('Shopping list not found'));

        // Práva: Pouze Owner nebo Admin může vyhazovat členy
        if (list.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            const error = new Error('Not authorized to remove members');
            error.statusCode = 403;
            throw error;
        }

        list.members = list.members.filter(member => member.toString() !== memberId);
        await list.save();

        res.status(200).json({ success: true, message: 'Member removed', data: list });
    } catch (error) {
        next(error);
    }
};

// --- MEMBERS: Opustit seznam (Leave) ---
export const leaveList = async (req, res, next) => {
    try {
        const { id } = req.params;
        const list = await ShoppingList.findById(id);

        if (!list) return next(new Error('Shopping list not found'));

        // Pokud je vlastník, nemůže odejít (musí seznam smazat)
        if (list.ownerId.toString() === req.user._id.toString()) {
            const error = new Error('Owner cannot leave the list, delete it instead');
            error.statusCode = 400;
            throw error;
        }

        // Odebrání sebe sama
        list.members = list.members.filter(member => member.toString() !== req.user._id.toString());
        await list.save();

        res.status(200).json({ success: true, message: 'You have left the list' });
    } catch (error) {
        next(error);
    }
};

// --- ITEMS: Přidání položky ---
export const addItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const list = await ShoppingList.findById(id);
        if (!list) return next(new Error('Shopping list not found'));

        // Práva: Owner, Member i Admin mohou přidávat položky
        const isMember = list.members.some(m => m.toString() === req.user._id.toString());
        const isOwner = list.ownerId.toString() === req.user._id.toString();
        
        if (!isOwner && !isMember && req.user.role !== 'admin') {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        list.items.push({ name, resolved: false });
        await list.save();

        res.status(200).json({ success: true, data: list });
    } catch (error) {
        next(error);
    }
};

// --- ITEMS: Smazání položky ---
export const removeItem = async (req, res, next) => {
    try {
        const { id, itemId } = req.params;
        const list = await ShoppingList.findById(id);

        if (!list) return next(new Error('Shopping list not found'));

        // Práva: Owner, Member i Admin
        const isMember = list.members.some(m => m.toString() === req.user._id.toString());
        const isOwner = list.ownerId.toString() === req.user._id.toString();

        if (!isOwner && !isMember && req.user.role !== 'admin') {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        // Mongoose metoda pull pro odstranění z pole
        list.items.pull({ _id: itemId });
        await list.save();

        res.status(200).json({ success: true, message: 'Item removed', data: list });
    } catch (error) {
        next(error);
    }
};

// --- ITEMS: Označit jako vyřešené (Toggle) ---
export const resolveItem = async (req, res, next) => {
    try {
        const { id, itemId } = req.params;
        const { resolved } = req.body; // true/false

        const list = await ShoppingList.findById(id);
        if (!list) return next(new Error('Shopping list not found'));

        // Práva: Owner, Member i Admin
        const isMember = list.members.some(m => m.toString() === req.user._id.toString());
        const isOwner = list.ownerId.toString() === req.user._id.toString();

        if (!isOwner && !isMember && req.user.role !== 'admin') {
            const error = new Error('Access denied');
            error.statusCode = 403;
            throw error;
        }

        // Najít položku v pod-dokumentu
        const item = list.items.id(itemId);
        if (!item) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        item.resolved = resolved;
        await list.save();

        res.status(200).json({ success: true, data: list });
    } catch (error) {
        next(error);
    }
};
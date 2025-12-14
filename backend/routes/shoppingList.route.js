import { Router } from "express";
import { 
    createShoppingList, 
    getShoppingLists, 
    getShoppingList, 
    updateShoppingList, 
    deleteShoppingList,
    archiveShoppingList,
    addMember,
    removeMember,
    leaveList,
    addItem,
    removeItem,
    resolveItem
} from "../controllers/shoppingList.controller.js";
import authorize from "../middleware/auth.middleware.js";

const shoppingListRouter = Router();

// --- ZÁKLADNÍ SEZNAMY ---
shoppingListRouter.post('/', authorize, createShoppingList);
shoppingListRouter.get('/', authorize, getShoppingLists);
shoppingListRouter.get('/:id', authorize, getShoppingList);
shoppingListRouter.patch('/:id', authorize, updateShoppingList);
shoppingListRouter.put('/:id/archive', authorize, archiveShoppingList);
shoppingListRouter.delete('/:id', authorize, deleteShoppingList);

// --- ČLENOVÉ (MEMBERS) ---
shoppingListRouter.post('/:id/members', authorize, addMember);
shoppingListRouter.delete('/:id/members/leave', authorize, leaveList); // Musí být před :memberId, aby se nehádalo
shoppingListRouter.delete('/:id/members/:memberId', authorize, removeMember);

// --- POLOŽKY (ITEMS) ---
shoppingListRouter.post('/:id/items', authorize, addItem);
shoppingListRouter.delete('/:id/items/:itemId', authorize, removeItem);
shoppingListRouter.patch('/:id/items/:itemId/resolve', authorize, resolveItem);

export default shoppingListRouter;
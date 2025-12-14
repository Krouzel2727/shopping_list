import mongoose from "mongoose";

// Schéma pro jednu položku v seznamu (Item)
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    resolved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Vytvoří createdAt i pro položku

// Schéma pro nákupní seznam
const shoppingListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Shopping list name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    // Pole členů (ID uživatelů), kteří mají přístup
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Pole položek (embedded documents)
    items: [itemSchema], 
    
    archived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;
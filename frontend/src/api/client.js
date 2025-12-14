import { mockShoppingLists, mockCurrentUser } from "./mockData";

// PŘEPÍNAČ: true = používáme mock data, false = voláme BE
const USE_MOCK = false; 

const BASE_URL = "http://localhost:5500/api/v1";

// Pomocná funkce pro simulaci zpoždění (aby bylo vidět "Loading..." 
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Získání tokenu z localStorage (pro reálný BE)
const getToken = () => localStorage.getItem("token");

// --- API FUNKCE ---

export const api = {
  // 1. Získat aktuálního uživatele (pro zjištění owner/member práv)
  getCurrentUser: async () => {
    if (USE_MOCK) {
      await sleep(500);
      return mockCurrentUser;
    }
    
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },

  // 2. Načíst všechny seznamy
  getLists: async () => {
    if (USE_MOCK) {
      await sleep(800); // Simulace zpoždění
      return mockShoppingLists;
    }
    const response = await fetch(`${BASE_URL}/shopping-lists`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error("Failed to fetch lists");
    return response.json();
  },

  // 3. Vytvořit seznam
  createList: async (name) => {
    if (USE_MOCK) {
      await sleep(500);
      const newList = {
        _id: Math.random().toString(),
        name,
        ownerId: mockCurrentUser,
        items: [],
        members: [],
        archived: false,
        createdAt: new Date().toISOString()
      };
      mockShoppingLists.push(newList); // lokální úprava
      return { success: true, data: newList };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}` 
      },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error("Failed to create list");
    return response.json();
  },

  // 4. Smazat seznam
  deleteList: async (id) => {
    if (USE_MOCK) {
      await sleep(500);
      return { success: true };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error("Failed to delete list");
    return response.json();
  },

  // 5. Detail seznamu (Items & Members)
  getListDetail: async (id) => {
    if (USE_MOCK) {
      await sleep(600);
      const list = mockShoppingLists.find(l => l._id === id);
      if (!list) throw new Error("List not found");
      return { success: true, data: list };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error("Failed to fetch list detail");
    return response.json();
  },

  // 6. Upravit název seznamu
  updateListName: async (id, name) => {
    if (USE_MOCK) {
      await sleep(300);
      const list = mockShoppingLists.find(l => l._id === id);
      if (list) list.name = name;
      return { success: true, data: list };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ name })
    });
    return response.json();
  },

  // 7. Přidat položku
  addItem: async (listId, itemName) => {
    if (USE_MOCK) {
      await sleep(300);
      const list = mockShoppingLists.find(l => l._id === listId);
      if (list) {
        list.items.push({ _id: Math.random().toString(), name: itemName, resolved: false });
      }
      return { success: true, data: list };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${listId}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ name: itemName })
    });
    return response.json();
  },

  // 8. Smazat položku
  removeItem: async (listId, itemId) => {
    if (USE_MOCK) {
      await sleep(300);
      const list = mockShoppingLists.find(l => l._id === listId);
      if (list) {
        list.items = list.items.filter(i => i._id !== itemId);
      }
      return { success: true };
    }
    await fetch(`${BASE_URL}/shopping-lists/${listId}/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return { success: true };
  },

  // 9. Přepnout stav položky (Resolved/Unresolved)
  resolveItem: async (listId, itemId, resolved) => {
    if (USE_MOCK) {
      // await sleep(200); // Funguje zvlástně zatím OFF
      const list = mockShoppingLists.find(l => l._id === listId);
      const item = list?.items.find(i => i._id === itemId);
      if (item) item.resolved = resolved;
      return { success: true };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${listId}/items/${itemId}/resolve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ resolved })
    });
    return response.json();
  },

  // 10. Přidat člena
  addMember: async (listId, email) => {
    if (USE_MOCK) {
      await sleep(500);
      const list = mockShoppingLists.find(l => l._id === listId);
      // Mock logika: Přidáme fiktivního usera
      if (list) {
        list.members.push({ _id: Math.random().toString(), name: "Nový Člen", email });
      }
      return { success: true, data: list };
    }
    const response = await fetch(`${BASE_URL}/shopping-lists/${listId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ email })
    });
    if(!response.ok) throw new Error("Uživatel nenalezen");
    return response.json();
  },

  // 11. Odebrat člena
  removeMember: async (listId, memberId) => {
    if (USE_MOCK) {
      await sleep(300);
      const list = mockShoppingLists.find(l => l._id === listId);
      if (list) {
        list.members = list.members.filter(m => m._id !== memberId);
      }
      return { success: true };
    }
    await fetch(`${BASE_URL}/shopping-lists/${listId}/members/${memberId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return { success: true };
  },

  // 12. Opustit seznam
  leaveList: async (listId) => {
    if (USE_MOCK) {
      await sleep(300);
      // V mock datech nic dělat nemusíme, jen simulujeme úspěch
      return { success: true };
    }
    await fetch(`${BASE_URL}/shopping-lists/${listId}/members/leave`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return { success: true };
  },

  // 13. Login
  login: async (email, password) => {
    if (USE_MOCK) {
      await sleep(500);
      // Mock login
      return { 
        success: true, 
        data: { 
          token: "mock_token_123", 
          user: { _id: "user1", name: "Jan Novák", email } 
        } 
      };
    }
    
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Login failed");
    return data;
  },

  // 14. Register
  register: async (name, email, password) => {
    if (USE_MOCK) {
      await sleep(500);
      return { success: true };
    }

    const response = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, passwordConfirm: password }) 
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || "Registration failed");
    return data;
  }

};


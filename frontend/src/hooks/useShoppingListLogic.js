import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export const useShoppingListLogic = (listId) => {
  const navigate = useNavigate();

  // --- STATE ---
  const [list, setList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI State
  const [filter, setFilter] = useState('all'); 
  const [newItemName, setNewItemName] = useState("");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  // --- FETCHING ---
  const fetchData = async () => {
    try {
      // setLoading(true); // funguje zvláštně zatím OFF
      const [user, listData] = await Promise.all([
        api.getCurrentUser(),
        api.getListDetail(listId)
      ]);
      setCurrentUser(user);
      setList(listData.data || listData);
      
      // Nastavíme tempName jen pokud zrovna needitujeme
      if (!editingName) {
         setTempName(listData.data?.name || listData.name);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //  load data
  useEffect(() => {
    fetchData();
  }, [listId]);

  const isOwner = list && currentUser && list.ownerId._id === currentUser._id;

  // --- HANDLERS ---
  
  const handleAddItem = async (e) => {
    if (e) e.preventDefault();
    if (!newItemName.trim()) return;
    try {
      await api.addItem(listId, newItemName);
      setNewItemName("");
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleToggleItem = async (itemId, currentStatus) => {
 
    const updatedItems = list.items.map(i => i._id === itemId ? { ...i, resolved: !currentStatus } : i);
    setList({ ...list, items: updatedItems });
    try { await api.resolveItem(listId, itemId, !currentStatus); } 
    catch (err) { fetchData(); }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Smazat položku?")) return;
    try { await api.removeItem(listId, itemId); fetchData(); } 
    catch (err) { alert(err.message); }
  };

  const handleAddMember = async () => {
    try { await api.addMember(listId, newMemberEmail); setShowMemberModal(false); setNewMemberEmail(""); fetchData(); } 
    catch (err) { alert(err.message); }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Odebrat uživatele?")) return;
    try { await api.removeMember(listId, memberId); fetchData(); } 
    catch (err) { alert(err.message); }
  };

  const handleLeaveList = async () => {
    if (!confirm("Opravdu chcete opustit tento seznam?")) return;
    try { await api.leaveList(listId); navigate("/"); } 
    catch (err) { alert(err.message); }
  };

  const handleUpdateName = async () => {
    try { await api.updateListName(listId, tempName); setEditingName(false); fetchData(); } 
    catch (err) { alert(err.message); }
  };

  
  return {
    // Data
    list, currentUser, loading, error, isOwner,
    // UI Getters/Setters
    filter, setFilter,
    newItemName, setNewItemName,
    showMemberModal, setShowMemberModal,
    newMemberEmail, setNewMemberEmail,
    editingName, setEditingName,
    tempName, setTempName,
    // Actions (Handlers)
    handleAddItem,
    handleToggleItem,
    handleDeleteItem,
    handleAddMember,
    handleRemoveMember,
    handleLeaveList,
    handleUpdateName
  };
};
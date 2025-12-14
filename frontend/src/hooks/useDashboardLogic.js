import { useState, useEffect } from 'react';
import { api } from '../api/client';

export const useDashboardLogic = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State - Create
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  // Modal State - Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  // Load Data
  const fetchLists = async () => {
    try {
      setLoading(true);
      const data = await api.getLists();
      setLists(data.data || data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Handlers
  const handleCreate = async () => {
    try {
      await api.createList(newListName);
      setShowCreateModal(false);
      setNewListName("");
      fetchLists();
    } catch (err) {
      alert("Chyba při vytváření: " + err.message);
    }
  };

  const openDeleteModal = (id) => {
    setListToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!listToDelete) return;
    try {
      await api.deleteList(listToDelete);
      setShowDeleteModal(false);
      fetchLists();
    } catch (err) {
      alert("Chyba při mazání: " + err.message);
    }
  };

  return {
    // Data
    lists, loading, error,
    // UI State
    showCreateModal, setShowCreateModal,
    newListName, setNewListName,
    showDeleteModal, setShowDeleteModal,
    // Actions
    handleCreate,
    openDeleteModal,
    handleDeleteConfirm
  };
};
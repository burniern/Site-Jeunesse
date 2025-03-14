import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  photo: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error('Erreur lors du chargement des membres');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newMember = response.data;
      setMembers(prev => [...prev, newMember]);
      toast.success('Membre ajouté avec succès');
      return newMember;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de l\'ajout du membre');
      throw new Error(message);
    }
  };

  const updateMember = async (id: number, formData: FormData) => {
    try {
      const response = await axios.put(`/api/members/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedMember = response.data;
      setMembers(prev => prev.map(member => member.id === id ? updatedMember : member));
      toast.success('Membre mis à jour avec succès');
      return updatedMember;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la mise à jour du membre');
      throw new Error(message);
    }
  };

  const deleteMember = async (id: number) => {
    try {
      await axios.delete(`/api/members/${id}`);
      setMembers(prev => prev.filter(member => member.id !== id));
      toast.success('Membre supprimé avec succès');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la suppression du membre');
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    loading,
    error,
    fetchMembers,
    addMember,
    updateMember,
    deleteMember
  };
};
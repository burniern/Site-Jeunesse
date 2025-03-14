import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events/upcoming');
      setEvents(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newEvent = response.data;
      setEvents(prev => [...prev, newEvent]);
      toast.success('Événement ajouté avec succès');
      return newEvent;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de l\'ajout de l\'événement');
      throw new Error(message);
    }
  };

  const updateEvent = async (id: number, formData: FormData) => {
    try {
      const response = await axios.put(`/api/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedEvent = response.data;
      setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
      toast.success('Événement mis à jour avec succès');
      return updatedEvent;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la mise à jour de l\'événement');
      throw new Error(message);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents(prev => prev.filter(event => event.id !== id));
      toast.success('Événement supprimé avec succès');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la suppression de l\'événement');
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchUpcomingEvents,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
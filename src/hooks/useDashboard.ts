import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalCarouselImages: number;
}

interface RecentEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface Activity {
  type: 'member' | 'event';
  description: string;
  date: string;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [statsResponse, eventsResponse, activitiesResponse] = await Promise.all([
        axios.get('/api/dashboard/stats'),
        axios.get('/api/dashboard/recent-events'),
        axios.get('/api/dashboard/recent-activities')
      ]);

      setStats(statsResponse.data);
      setRecentEvents(eventsResponse.data);
      setActivities(activitiesResponse.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error('Erreur lors du chargement des données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    recentEvents,
    activities,
    loading,
    error,
    refresh: fetchDashboardData
  };
};
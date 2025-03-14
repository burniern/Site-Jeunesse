import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Si FormData est utilisé, ne pas définir Content-Type
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    let message = 'Une erreur est survenue';
    
    if (error.response) {
      // Erreur serveur avec message
      const data = error.response.data as any;
      if (data.error) {
        message = data.error;
      } else if (error.response.status === 401) {
        message = 'Session expirée, veuillez vous reconnecter';
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        message = 'Accès non autorisé';
      } else if (error.response.status === 404) {
        message = 'Ressource non trouvée';
      } else if (error.response.status >= 500) {
        message = 'Erreur serveur, veuillez réessayer plus tard';
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      message = 'Impossible de contacter le serveur';
    }
    
    toast.error(message);
    return Promise.reject(error);
  }
);

// Service pour les membres
export const memberService = {
  getAll: () => api.get('/members'),
  getOne: (id: number) => api.get(`/members/${id}`),
  create: (data: FormData) => api.post('/members', data),
  update: (id: number, data: FormData) => api.put(`/members/${id}`, data),
  delete: (id: number) => api.delete(`/members/${id}`)
};

// Service pour les événements
export const eventService = {
  getAll: () => api.get('/events'),
  getUpcoming: () => api.get('/events/upcoming'),
  getOne: (id: number) => api.get(`/events/${id}`),
  create: (data: FormData) => api.post('/events', data),
  update: (id: number, data: FormData) => api.put(`/events/${id}`, data),
  delete: (id: number) => api.delete(`/events/${id}`)
};

// Service pour le carrousel
export const carouselService = {
  getAll: () => api.get('/carousel'),
  getOne: (id: number) => api.get(`/carousel/${id}`),
  create: (data: FormData) => api.post('/carousel', data),
  update: (id: number, data: FormData) => api.put(`/carousel/${id}`, data),
  delete: (id: number) => api.delete(`/carousel/${id}`)
};

// Service pour les utilisateurs
export const userService = {
  getAll: () => api.get('/users'),
  getOne: (id: number) => api.get(`/users/${id}`),
  create: (data: FormData) => api.post('/users', data),
  update: (id: number, data: FormData) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`)
};

// Service pour le tableau de bord
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentEvents: () => api.get('/dashboard/recent-events'),
  getRecentActivities: () => api.get('/dashboard/recent-activities')
};

// Service pour les contacts
export const contactService = {
  create: (data: FormData) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getOne: (id: number) => api.get(`/contact/${id}`),
  delete: (id: number) => api.delete(`/contact/${id}`)
};

// Service pour l'authentification
export const authService = {
  login: (username: string, password: string) => 
    api.post('/auth/login', { username, password }),
  getCurrentUser: () => api.get('/auth/me')
};

export default api;
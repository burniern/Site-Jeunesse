import { z } from 'zod';

// Schémas de validation pour les formulaires
export const memberSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[0-9\s-]{10,}$/, 'Numéro de téléphone invalide').optional().or(z.literal('')),
  role: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Heure invalide'),
  location: z.string().min(3, 'Le lieu doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
});

export const carouselSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  alt: z.string().min(3, 'Le texte alternatif doit contenir au moins 3 caractères'),
  order: z.number().int().positive('L\'ordre doit être un nombre positif'),
  url: z.string().url('URL invalide').optional().or(z.literal('')),
});

export const userSchema = z.object({
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  role: z.enum(['Administrateur', 'Éditeur'], {
    errorMap: () => ({ message: 'Rôle invalide' }),
  }),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Le nom d\'utilisateur est requis'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});
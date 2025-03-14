import axios from 'axios';

// Fonction pour valider les fichiers uploadés
export const validateFile = async (file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB par défaut
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxWidth = 1920,
    maxHeight = 1080
  } = options;

  // Vérification de la taille
  if (file.size > maxSize) {
    throw new Error(`Le fichier est trop volumineux. Maximum: ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  // Vérification du type MIME
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`);
  }

  // Vérification des dimensions pour les images
  if (file.type.startsWith('image/')) {
    const img = new Image();
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error('Impossible de lire l\'image'));
      img.src = URL.createObjectURL(file);
    });

    if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
      throw new Error(`Dimensions maximales autorisées: ${maxWidth}x${maxHeight}px`);
    }
  }

  return true;
};

// Fonction pour nettoyer les données sensibles
export const sanitizeData = <T extends Record<string, any>>(data: T, fields: string[]): Partial<T> => {
  const sanitized = { ...data };
  fields.forEach(field => {
    if (field in sanitized) {
      delete sanitized[field];
    }
  });
  return sanitized;
};

// Fonction pour vérifier les permissions
export const checkPermissions = async (userId: string, resource: string, action: string) => {
  try {
    const response = await axios.post('/api/auth/check-permissions', {
      userId,
      resource,
      action
    });
    return response.data.allowed;
  } catch (error) {
    console.error('Error checking permissions:', error);
    return false;
  }
};
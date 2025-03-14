import { useMemo } from 'react';

interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
}

export const useFileValidation = (options: FileValidationOptions = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB par défaut
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxWidth = 1920,
    maxHeight = 1080
  } = options;

  const validateFile = async (file: File): Promise<{ valid: boolean; error?: string }> => {
    // Vérification du type MIME
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Type de fichier non autorisé. Types acceptés : ${allowedTypes.join(', ')}`
      };
    }

    // Vérification de la taille
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Fichier trop volumineux. Taille maximale : ${Math.round(maxSize / 1024 / 1024)}MB`
      };
    }

    // Vérification des dimensions pour les images
    if (file.type.startsWith('image/')) {
      try {
        const dimensions = await getImageDimensions(file);
        if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
          return {
            valid: false,
            error: `Dimensions maximales autorisées : ${maxWidth}x${maxHeight}px`
          };
        }
      } catch (error) {
        return {
          valid: false,
          error: 'Impossible de vérifier les dimensions de l\'image'
        };
      }
    }

    return { valid: true };
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const resizeImage = async (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          file.type,
          0.9
        );
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return useMemo(() => ({
    validateFile,
    resizeImage,
    maxSize,
    allowedTypes,
    maxWidth,
    maxHeight
  }), [maxSize, allowedTypes, maxWidth, maxHeight]);
};
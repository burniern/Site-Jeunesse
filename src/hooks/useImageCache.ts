import { useState, useEffect } from 'react';

interface CacheOptions {
  maxAge?: number; // Durée de vie du cache en millisecondes
  maxSize?: number; // Nombre maximum d'images en cache
}

interface CachedImage {
  url: string;
  blob: Blob;
  timestamp: number;
}

export const useImageCache = (options: CacheOptions = {}) => {
  const {
    maxAge = 24 * 60 * 60 * 1000, // 24 heures par défaut
    maxSize = 100 // 100 images par défaut
  } = options;

  const [cache] = useState<Map<string, CachedImage>>(new Map());

  // Nettoyer le cache périodiquement
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      for (const [url, image] of cache.entries()) {
        if (now - image.timestamp > maxAge) {
          cache.delete(url);
        }
      }
    };

    const interval = setInterval(cleanup, 60 * 1000); // Nettoyage toutes les minutes
    return () => clearInterval(interval);
  }, [cache, maxAge]);

  const getImage = async (url: string): Promise<string> => {
    // Vérifier si l'image est en cache et valide
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < maxAge) {
      return URL.createObjectURL(cached.blob);
    }

    try {
      // Télécharger l'image
      const response = await fetch(url);
      const blob = await response.blob();

      // Ajouter au cache
      if (cache.size >= maxSize) {
        // Supprimer la plus ancienne entrée
        const [firstKey] = cache.keys();
        cache.delete(firstKey);
      }

      cache.set(url, {
        url,
        blob,
        timestamp: Date.now()
      });

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image:', error);
      return url; // Retourner l'URL originale en cas d'erreur
    }
  };

  const preloadImage = async (url: string): Promise<void> => {
    await getImage(url);
  };

  const clearCache = () => {
    cache.clear();
  };

  return {
    getImage,
    preloadImage,
    clearCache
  };
};
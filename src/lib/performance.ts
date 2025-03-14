// Cache pour les images
const imageCache = new Map<string, { blob: Blob; timestamp: number }>();
const MAX_CACHE_SIZE = 100; // Nombre maximum d'images en cache
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures

export const cacheImage = async (url: string): Promise<string> => {
  // Vérifier si l'image est déjà en cache et valide
  const cached = imageCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return URL.createObjectURL(cached.blob);
  }

  try {
    // Télécharger l'image
    const response = await fetch(url);
    const blob = await response.blob();

    // Nettoyer le cache si nécessaire
    if (imageCache.size >= MAX_CACHE_SIZE) {
      const [firstKey] = imageCache.keys();
      imageCache.delete(firstKey);
    }

    // Ajouter au cache
    imageCache.set(url, {
      blob,
      timestamp: Date.now()
    });

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error caching image:', error);
    return url;
  }
};

// Préchargement des images
export const preloadImages = async (urls: string[]) => {
  return Promise.all(urls.map(url => cacheImage(url)));
};

// Nettoyage du cache
export const clearImageCache = () => {
  imageCache.clear();
};

// Optimisation des requêtes API
export const batchRequests = async <T>(
  requests: Promise<T>[],
  batchSize = 5
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }
  
  return results;
};

// Debounce pour les recherches
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
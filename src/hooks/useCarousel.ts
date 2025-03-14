import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export interface CarouselImage {
  id: number;
  title: string;
  url: string | null;
  alt: string;
  order: number;
  file_path?: string | null;
  file_name?: string | null;
  file_size?: number | null;
  created_at: string;
  updated_at: string;
}

export const useCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/carousel');
      setImages(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error('Erreur lors du chargement des images');
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/carousel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newImage = response.data;
      setImages(prev => [...prev, newImage]);
      toast.success('Image ajoutée avec succès');
      return newImage;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de l\'ajout de l\'image');
      throw new Error(message);
    }
  };

  const updateImage = async (id: number, formData: FormData) => {
    try {
      const response = await axios.put(`/api/carousel/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedImage = response.data;
      setImages(prev => prev.map(image => image.id === id ? updatedImage : image));
      toast.success('Image mise à jour avec succès');
      return updatedImage;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la mise à jour de l\'image');
      throw new Error(message);
    }
  };

  const deleteImage = async (id: number) => {
    try {
      await axios.delete(`/api/carousel/${id}`);
      setImages(prev => prev.filter(image => image.id !== id));
      toast.success('Image supprimée avec succès');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error('Erreur lors de la suppression de l\'image');
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    fetchImages,
    addImage,
    updateImage,
    deleteImage
  };
};
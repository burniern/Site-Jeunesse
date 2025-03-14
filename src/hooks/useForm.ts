import { useState, useCallback } from 'react';
import { useFileValidation } from './useFileValidation';
import toast from 'react-hot-toast';

interface UseFormOptions {
  onSubmit: (formData: FormData) => Promise<void>;
  fileField?: string;
  fileValidation?: {
    maxSize?: number;
    allowedTypes?: string[];
    maxWidth?: number;
    maxHeight?: number;
  };
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  options: UseFormOptions
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileValidation = useFileValidation(options.fileValidation);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  }, []);

  const handleFileChange = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (options.fileValidation) {
        const validation = await fileValidation.validateFile(file);
        if (!validation.valid) {
          toast.error(validation.error);
          return;
        }

        // Redimensionner l'image si nécessaire
        if (file.type.startsWith('image/')) {
          const resizedBlob = await fileValidation.resizeImage(
            file,
            options.fileValidation.maxWidth || 1920,
            options.fileValidation.maxHeight || 1080
          );
          const resizedFile = new File([resizedBlob], file.name, { type: file.type });
          setSelectedFile(resizedFile);
        } else {
          setSelectedFile(file);
        }
      } else {
        setSelectedFile(file);
      }

      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      toast.error(message);
    }
  }, [options.fileValidation, fileValidation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Ajouter tous les champs du formulaire
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Ajouter le fichier s'il existe
      if (selectedFile && options.fileField) {
        formData.append(options.fileField, selectedFile);
      }

      await options.onSubmit(formData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setValues(initialValues);
    setSelectedFile(null);
    setError(null);
  }, [initialValues]);

  return {
    values,
    loading,
    error,
    selectedFile,
    handleChange,
    handleFileChange,
    handleSubmit,
    reset
  };
};
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { eventService } from '../../../services/api';
import FormField from '../../../components/admin/FormField';
import FileUpload from '../../../components/admin/FileUpload';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const EditEvent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageUrl, setCurrentImageUrl] = React.useState<string>('');
  
  const { values, loading, error, selectedFile, handleChange, handleFileChange, handleSubmit, reset } = useForm<EventFormData>(
    {
      title: '',
      date: '',
      time: '',
      location: '',
      description: ''
    },
    {
      onSubmit: async (formData) => {
        await eventService.update(Number(id), formData);
        navigate('/admin/evenements');
      },
      fileField: 'image',
      fileValidation: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      }
    }
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventService.getOne(Number(id));
        const event = response.data;
        
        reset();
        setCurrentImageUrl(event.image);
        
        // Update form values
        Object.keys(values).forEach(key => {
          const value = event[key];
          if (value !== undefined) {
            handleChange({
              target: { name: key, value }
            } as React.ChangeEvent<HTMLInputElement>);
          }
        });
      } catch (error) {
        console.error('Error fetching event:', error);
        navigate('/admin/evenements');
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, navigate, reset, handleChange, values]);

  if (loading && !values.title) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Modifier un événement</h1>
          <p className="text-gray-600">Modifiez les informations de l'événement.</p>
        </div>
        <button
          onClick={() => navigate('/admin/evenements')}
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à la liste
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                id="title"
                name="title"
                label="Titre de l'événement"
                value={values.title}
                onChange={handleChange}
                required
              />
            </div>

            <FormField
              id="date"
              name="date"
              type="date"
              label="Date"
              value={values.date}
              onChange={handleChange}
              required
            />

            <FormField
              id="time"
              name="time"
              type="time"
              label="Heure"
              value={values.time}
              onChange={handleChange}
              required
            />

            <div className="md:col-span-2">
              <FormField
                id="location"
                name="location"
                label="Lieu"
                value={values.location}
                onChange={handleChange}
                required
                placeholder="Adresse ou lieu de l'événement"
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                id="description"
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                required
                as="textarea"
                placeholder="Décrivez l'événement..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <FileUpload
                onChange={handleFileChange}
                currentFile={selectedFile}
                currentUrl={currentImageUrl}
                label="Changer l'image"
                accept="image/jpeg,image/png,image/webp"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/evenements')}
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Modification en cours...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
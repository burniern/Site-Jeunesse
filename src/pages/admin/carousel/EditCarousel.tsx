import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { carouselService } from '../../../services/api';
import FormField from '../../../components/admin/FormField';
import FileUpload from '../../../components/admin/FileUpload';

interface CarouselFormData {
  title: string;
  alt: string;
  order: number;
  url?: string;
}

const EditCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageUrl, setCurrentImageUrl] = React.useState<string>('');
  
  const { values, loading, error, selectedFile, handleChange, handleFileChange, handleSubmit, reset } = useForm<CarouselFormData>(
    {
      title: '',
      alt: '',
      order: 1,
      url: ''
    },
    {
      onSubmit: async (formData) => {
        await carouselService.update(Number(id), formData);
        navigate('/admin/carousel');
      },
      fileField: 'image',
      fileValidation: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      }
    }
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await carouselService.getOne(Number(id));
        const image = response.data;
        
        reset();
        setCurrentImageUrl(image.url);
        
        // Update form values
        Object.keys(values).forEach(key => {
          const value = image[key];
          if (value !== undefined) {
            handleChange({
              target: { name: key, value }
            } as React.ChangeEvent<HTMLInputElement>);
          }
        });
      } catch (error) {
        console.error('Error fetching image:', error);
        navigate('/admin/carousel');
      }
    };

    if (id) {
      fetchImage();
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
          <h1 className="text-3xl font-display font-bold mb-2">Modifier une image</h1>
          <p className="text-gray-600">Modifiez les informations de l'image du carrousel.</p>
        </div>
        <button
          onClick={() => navigate('/admin/carousel')}
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
          <div className="grid grid-cols-1 gap-6">
            <FormField
              id="title"
              name="title"
              label="Titre"
              value={values.title}
              onChange={handleChange}
              required
              placeholder="Titre de l'image"
            />

            <FormField
              id="alt"
              name="alt"
              label="Texte alternatif"
              value={values.alt}
              onChange={handleChange}
              required
              placeholder="Description de l'image"
            />

            <FormField
              id="order"
              name="order"
              type="number"
              label="Ordre d'affichage"
              value={values.order}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="space-y-4">
                <FileUpload
                  onChange={handleFileChange}
                  currentFile={selectedFile}
                  currentUrl={currentImageUrl}
                  label="Changer l'image"
                  accept="image/jpeg,image/png,image/webp"
                />

                <div className="relative">
                  <div className="absolute inset-0 bg-gray-100 rounded-md"></div>
                  <input
                    type="url"
                    name="url"
                    className="input relative z-10 bg-transparent"
                    value={values.url}
                    onChange={handleChange}
                    placeholder="Ou entrez une URL d'image..."
                    disabled={!!selectedFile}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/carousel')}
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

export default EditCarousel;
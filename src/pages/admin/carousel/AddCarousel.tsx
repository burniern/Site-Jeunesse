import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const AddCarousel: React.FC = () => {
  const navigate = useNavigate();
  
  const { values, loading, error, selectedFile, handleChange, handleFileChange, handleSubmit } = useForm<CarouselFormData>(
    {
      title: '',
      alt: '',
      order: 1,
      url: ''
    },
    {
      onSubmit: async (formData) => {
        await carouselService.create(formData);
        navigate('/admin/carousel');
      },
      fileField: 'image',
      fileValidation: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      }
    }
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Ajouter une image</h1>
          <p className="text-gray-600">Ajoutez une nouvelle image au carrousel de la page d'accueil.</p>
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
                  label="Choisir une image"
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
              disabled={loading || (!selectedFile && !values.url)}
              className="btn btn-primary"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter l\'image'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarousel;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { useCarousel } from '../../../hooks/useCarousel';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

const AdminCarousel: React.FC = () => {
  const { images, loading, deleteImage, updateImage } = useCarousel();
  const [searchTerm, setSearchTerm] = useState('');
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  
  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteImage(id);
      setImageToDelete(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleMoveUp = async (image: any) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    if (currentIndex > 0) {
      const prevImage = images[currentIndex - 1];
      try {
        const formData = new FormData();
        formData.append('order', prevImage.order.toString());
        await updateImage(image.id, formData);
        
        const prevFormData = new FormData();
        prevFormData.append('order', image.order.toString());
        await updateImage(prevImage.id, prevFormData);
      } catch (error) {
        console.error('Erreur lors du changement d\'ordre:', error);
      }
    }
  };

  const handleMoveDown = async (image: any) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    if (currentIndex < images.length - 1) {
      const nextImage = images[currentIndex + 1];
      try {
        const formData = new FormData();
        formData.append('order', nextImage.order.toString());
        await updateImage(image.id, formData);
        
        const nextFormData = new FormData();
        nextFormData.append('order', image.order.toString());
        await updateImage(nextImage.id, nextFormData);
      } catch (error) {
        console.error('Erreur lors du changement d\'ordre:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Gestion du carrousel</h1>
          <p className="text-gray-600">Gérez les images du carrousel de la page d'accueil.</p>
        </div>
        
        <Link to="/admin/carousel/ajouter" className="btn btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-1" />
          Ajouter une image
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une image..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordre
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredImages.map((image, index) => (
                  <tr key={image.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-20 w-32 flex-shrink-0">
                          <img 
                            className="h-20 w-32 object-cover rounded" 
                            src={image.url} 
                            alt={image.alt}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {image.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {image.alt}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleMoveUp(image)}
                          disabled={index === 0}
                          className={`p-1 rounded hover:bg-gray-100 ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <MoveUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(image)}
                          disabled={index === images.length - 1}
                          className={`p-1 rounded hover:bg-gray-100 ${index === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <MoveDown className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-gray-500">
                          Position {image.order}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/admin/carousel/${image.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => setImageToDelete(image.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune image trouvée.</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={imageToDelete !== null}
        onClose={() => setImageToDelete(null)}
        onConfirm={() => imageToDelete && handleDelete(imageToDelete)}
        title="Supprimer l'image"
        message="Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        type="danger"
      />
    </div>
  );
};

export default AdminCarousel;
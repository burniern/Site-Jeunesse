import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { memberService } from '../../../services/api';
import FormField from '../../../components/admin/FormField';
import FileUpload from '../../../components/admin/FileUpload';

interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const EditMember: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPhotoUrl, setCurrentPhotoUrl] = React.useState<string>('');
  
  const { values, loading, error, selectedFile, handleChange, handleFileChange, handleSubmit, reset } = useForm<MemberFormData>(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: ''
    },
    {
      onSubmit: async (formData) => {
        await memberService.update(Number(id), formData);
        navigate('/admin/membres');
      },
      fileField: 'photo',
      fileValidation: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      }
    }
  );

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await memberService.getOne(Number(id));
        const member = response.data;
        
        reset();
        setCurrentPhotoUrl(member.photo);
        
        // Update form values
        Object.keys(values).forEach(key => {
          const value = member[key];
          if (value !== undefined) {
            handleChange({
              target: { name: key, value }
            } as React.ChangeEvent<HTMLInputElement>);
          }
        });
      } catch (error) {
        console.error('Error fetching member:', error);
        navigate('/admin/membres');
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id, navigate, reset, handleChange, values]);

  if (loading && !values.firstName) {
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
          <h1 className="text-3xl font-display font-bold mb-2">Modifier un membre</h1>
          <p className="text-gray-600">Modifiez les informations du membre.</p>
        </div>
        <button
          onClick={() => navigate('/admin/membres')}
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
            <FormField
              id="firstName"
              name="firstName"
              label="Prénom"
              value={values.firstName}
              onChange={handleChange}
              required
            />

            <FormField
              id="lastName"
              name="lastName"
              label="Nom"
              value={values.lastName}
              onChange={handleChange}
              required
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />

            <FormField
              id="phone"
              name="phone"
              type="tel"
              label="Téléphone"
              value={values.phone}
              onChange={handleChange}
            />

            <FormField
              id="role"
              name="role"
              label="Rôle"
              value={values.role}
              onChange={handleChange}
              as="select"
            >
              <option value="">Membre</option>
              <option value="Président">Président</option>
              <option value="Vice-président">Vice-président</option>
              <option value="Trésorier">Trésorier</option>
              <option value="Secrétaire">Secrétaire</option>
            </FormField>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <FileUpload
                onChange={handleFileChange}
                currentFile={selectedFile}
                currentUrl={currentPhotoUrl}
                label="Changer la photo"
                accept="image/jpeg,image/png,image/webp"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/membres')}
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

export default EditMember;
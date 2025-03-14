import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useUsers } from '../../../hooks/useUsers';

interface UserFormData {
  username: string;
  email: string;
  role: string;
}

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users, updateUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const user = users.find(u => u.id === Number(id));
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role
      });
    } else {
      navigate('/admin/utilisateurs');
    }
  }, [id, users, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier si le nom d'utilisateur existe déjà
    const existingUser = users.find(u => u.username === formData.username && u.id !== Number(id));
    if (existingUser) {
      setError('Ce nom d\'utilisateur existe déjà.');
      return;
    }

    // Vérifier si l'email existe déjà
    const existingEmail = users.find(u => u.email === formData.email && u.id !== Number(id));
    if (existingEmail) {
      setError('Cette adresse email est déjà utilisée.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateUser(Number(id), formData);
      navigate('/admin/utilisateurs');
    } catch (error) {
      setError('Une erreur est survenue lors de la modification de l\'utilisateur.');
    } finally {
      setLoading(false);
    }
  };

  if (!formData.username) {
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
          <h1 className="text-3xl font-display font-bold mb-2">Modifier un utilisateur</h1>
          <p className="text-gray-600">Modifiez les informations de l'utilisateur.</p>
        </div>
        <button
          onClick={() => navigate('/admin/utilisateurs')}
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
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="input"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Rôle
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  id="role"
                  name="role"
                  required
                  className="input pl-10"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={formData.username === 'admin'}
                >
                  <option value="Éditeur">Éditeur</option>
                  <option value="Administrateur">Administrateur</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/utilisateurs')}
              className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || formData.username === 'admin'}
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

export default EditUser;
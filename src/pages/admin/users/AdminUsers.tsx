import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Shield } from 'lucide-react';
import { useUsers } from '../../../hooks/useUsers';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

const AdminUsers: React.FC = () => {
  const { users, loading, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  
  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUserToDelete(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Gérez les utilisateurs ayant accès à l'administration.</p>
        </div>
        
        <Link to="/admin/utilisateurs/ajouter" className="btn btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-1" />
          Ajouter un utilisateur
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
              placeholder="Rechercher un utilisateur..."
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
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière connexion
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-primary/10 rounded-full p-2 mr-3">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'Administrateur' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/admin/utilisateurs/${user.id}`}
                          className={`text-blue-600 hover:text-blue-900 ${
                            user.username === 'admin' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          onClick={(e) => {
                            if (user.username === 'admin') {
                              e.preventDefault();
                            }
                          }}
                          title={user.username === 'admin' ? "L'utilisateur admin ne peut pas être modifié" : ""}
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => user.username !== 'admin' && setUserToDelete(user.id)}
                          className={`text-red-600 hover:text-red-900 ${
                            user.username === 'admin' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={user.username === 'admin'}
                          title={user.username === 'admin' ? "L'utilisateur admin ne peut pas être supprimé" : ""}
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
            <p className="text-gray-500">Aucun utilisateur trouvé.</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => userToDelete && handleDelete(userToDelete)}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        type="danger"
      />
    </div>
  );
};

export default AdminUsers;
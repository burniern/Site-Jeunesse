import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-display font-bold text-gray-800">
          Administration
        </h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-2 mr-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
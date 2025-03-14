import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wine, Users, Calendar, Settings, Home, Image } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="bg-dark text-white w-64 min-h-screen flex-shrink-0 flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-center space-x-2 mb-8">
          <Wine className="h-8 w-8 text-primary" />
          <span className="font-display font-bold text-xl">Jeunesse de Bière</span>
        </div>
        
        <nav className="space-y-1">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Home className="h-5 w-5 mr-3" />
            <span>Tableau de bord</span>
          </NavLink>
          
          <NavLink 
            to="/admin/membres" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Membres</span>
          </NavLink>
          
          <NavLink 
            to="/admin/evenements" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Calendar className="h-5 w-5 mr-3" />
            <span>Événements</span>
          </NavLink>
          
          <NavLink 
            to="/admin/carousel" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Image className="h-5 w-5 mr-3" />
            <span>Carrousel</span>
          </NavLink>
          
          <NavLink 
            to="/admin/utilisateurs" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Utilisateurs</span>
          </NavLink>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <NavLink 
          to="/" 
          className="flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5 mr-3" />
          <span>Retour au site</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
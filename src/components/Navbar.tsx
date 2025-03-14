import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Wine } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-primary" />
            <span className="font-display font-bold text-xl text-dark">Jeunesse de Bière</span>
          </NavLink>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => 
              isActive ? "text-primary font-medium" : "text-dark hover:text-primary transition-colors"
            }>
              Accueil
            </NavLink>
            <NavLink to="/membres" className={({ isActive }) => 
              isActive ? "text-primary font-medium" : "text-dark hover:text-primary transition-colors"
            }>
              Membres
            </NavLink>
            <NavLink to="/evenements" className={({ isActive }) => 
              isActive ? "text-primary font-medium" : "text-dark hover:text-primary transition-colors"
            }>
              Événements
            </NavLink>
            <NavLink to="/a-propos" className={({ isActive }) => 
              isActive ? "text-primary font-medium" : "text-dark hover:text-primary transition-colors"
            }>
              À propos
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => 
              isActive ? "text-primary font-medium" : "text-dark hover:text-primary transition-colors"
            }>
              Contact
            </NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-dark hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <NavLink to="/" 
              className={({ isActive }) => 
                isActive ? "block py-2 text-primary font-medium" : "block py-2 text-dark hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink to="/membres" 
              className={({ isActive }) => 
                isActive ? "block py-2 text-primary font-medium" : "block py-2 text-dark hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              Membres
            </NavLink>
            <NavLink to="/evenements" 
              className={({ isActive }) => 
                isActive ? "block py-2 text-primary font-medium" : "block py-2 text-dark hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              Événements
            </NavLink>
            <NavLink to="/a-propos" 
              className={({ isActive }) => 
                isActive ? "block py-2 text-primary font-medium" : "block py-2 text-dark hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              À propos
            </NavLink>
            <NavLink to="/contact" 
              className={({ isActive }) => 
                isActive ? "block py-2 text-primary font-medium" : "block py-2 text-dark hover:text-primary"
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
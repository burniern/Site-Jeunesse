import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wine className="h-8 w-8 text-primary" />
              <span className="font-display font-bold text-xl">Jeunesse de Bière</span>
            </div>
            <p className="text-light/80 mb-4">
              Association de jeunes dynamiques organisant des événements festifs et culturels dans la commune de Bière.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-light/80 hover:text-primary transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/membres" className="text-light/80 hover:text-primary transition-colors">Membres</Link>
              </li>
              <li>
                <Link to="/evenements" className="text-light/80 hover:text-primary transition-colors">Événements</Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-light/80 hover:text-primary transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="text-light/80 hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-light/80 hover:text-primary transition-colors">Connexion</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-light/80">1145 Bière, Vaud, Suisse</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@jeunessebiere.ch" className="text-light/80 hover:text-primary transition-colors">
                  contact@jeunessebiere.ch
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+41791234567" className="text-light/80 hover:text-primary transition-colors">
                  +41 79 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-light/10 mt-12 pt-8 text-center text-light/60">
          <p>&copy; {currentYear} Jeunesse de Bière - Site internet : <a href="https://ch.linkedin.com/in/nicolas-burnier-16078718a" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Nicolas Burnier</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
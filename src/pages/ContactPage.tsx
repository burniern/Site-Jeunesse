import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Vous avez des questions, des suggestions ou souhaitez rejoindre notre association ? N'hésitez pas à nous contacter !
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Informations de contact</h2>
            
            <div className="card p-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-4" />
                  <div>
                    <h3 className="font-bold mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Jeunesse de Bière<br />
                      Case postale 123<br />
                      1145 Bière<br />
                      Vaud, Suisse
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-4" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:contact@jeunessebiere.ch" className="text-gray-600 hover:text-primary transition-colors">
                      contact@jeunessebiere.ch
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-4" />
                  <div>
                    <h3 className="font-bold mb-1">Téléphone</h3>
                    <a href="tel:+41791234567" className="text-gray-600 hover:text-primary transition-colors">
                      +41 79 123 45 67
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-4" />
                  <div>
                    <h3 className="font-bold mb-1">Horaires de permanence</h3>
                    <p className="text-gray-600">
                      Mardi: 18h00 - 20h00<br />
                      Samedi: 10h00 - 12h00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="font-display font-bold text-xl mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
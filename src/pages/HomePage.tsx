import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import EventCard from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

const HomePage: React.FC = () => {
  const { events, loading } = useEvents();
  
  // Mock carousel images until we implement carousel management
  const carouselImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Jeunesse de Bière - Événement festif"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Jeunesse de Bière - Activité en plein air"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Jeunesse de Bière - Soirée musicale"
    }
  ];

  return (
    <div>
      <Carousel images={carouselImages} />
      
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Bienvenue à la Jeunesse de Bière</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Depuis plus de 50 ans, notre association anime la vie du village de Bière à travers des événements festifs, culturels et sportifs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="card p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Convivialité</h3>
              <p className="text-gray-600">
                Rejoignez une communauté dynamique et chaleureuse, où l'amitié et le partage sont au cœur de nos activités.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Tradition</h3>
              <p className="text-gray-600">
                Perpétuez les traditions locales tout en créant de nouveaux souvenirs et en renforçant l'identité de notre village.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Festivités</h3>
              <p className="text-gray-600">
                Participez à des événements variés tout au long de l'année : bals, tournois sportifs, sorties culturelles et bien plus encore.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section bg-light">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-bold">Prochains événements</h2>
            <Link to="/evenements" className="btn btn-primary mt-4 md:mt-0">
              Voir tous les événements
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun événement à venir pour le moment.</p>
            </div>
          )}
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="bg-primary/10 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Rejoignez-nous !</h2>
              <p className="text-lg mb-8">
                Vous avez entre 16 et 30 ans et habitez Bière ou les environs ? Rejoignez notre jeunesse et participez à des événements inoubliables !
              </p>
              <Link to="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
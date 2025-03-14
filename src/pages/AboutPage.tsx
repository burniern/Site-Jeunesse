import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">À propos de nous</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'histoire et les valeurs de la Jeunesse de Bière, une association qui anime la vie locale depuis plus de 50 ans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Notre histoire</h2>
            <p className="text-gray-700 mb-4">
              Fondée en 1970, la Jeunesse de Bière est née de la volonté de quelques jeunes du village de créer une association pour animer la vie locale et perpétuer les traditions.
            </p>
            <p className="text-gray-700 mb-4">
              Au fil des années, notre association s'est développée et a diversifié ses activités, tout en conservant son esprit convivial et son attachement aux traditions locales.
            </p>
            <p className="text-gray-700">
              Aujourd'hui, la Jeunesse de Bière compte une trentaine de membres actifs, âgés de 16 à 30 ans, qui s'investissent tout au long de l'année pour organiser des événements variés et créer du lien social dans notre commune.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
              alt="Membres de la Jeunesse de Bière" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Événement organisé par la Jeunesse de Bière" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-display font-bold mb-4">Nos valeurs</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">Amitié et solidarité</h3>
                  <p className="text-gray-700">
                    Nous cultivons l'esprit d'équipe et l'entraide entre nos membres, créant ainsi des liens forts qui perdurent bien au-delà des activités de l'association.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">Tradition et innovation</h3>
                  <p className="text-gray-700">
                    Nous respectons et perpétuons les traditions locales tout en les faisant évoluer et en créant de nouveaux événements adaptés aux attentes actuelles.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">Engagement local</h3>
                  <p className="text-gray-700">
                    Nous nous impliquons activement dans la vie de notre commune, en collaborant avec les autres associations et en participant aux événements locaux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-light rounded-lg p-8 md:p-12 text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Nos activités</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Tout au long de l'année, nous organisons divers événements pour animer la vie locale et créer des moments de convivialité.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Événements festifs</h3>
              <p className="text-gray-600">
                Bals, soirées à thème, fêtes saisonnières... Nous organisons régulièrement des événements festifs ouverts à tous.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Activités sportives</h3>
              <p className="text-gray-600">
                Tournois de pétanque, matchs de football, randonnées... Nous proposons diverses activités sportives pour tous les goûts.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Actions solidaires</h3>
              <p className="text-gray-600">
                Collectes de fonds, soutien aux associations locales, actions environnementales... Nous nous engageons pour des causes qui nous tiennent à cœur.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Rejoignez-nous !</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Vous avez entre 16 et 30 ans et habitez Bière ou les environs ? Vous souhaitez participer à des événements inoubliables et faire partie d'une équipe dynamique ? N'hésitez pas à nous contacter !
          </p>
          <Link to="/contact" className="btn btn-primary">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
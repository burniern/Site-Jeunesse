import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Clock, AlertCircle, Image, UserPlus, PlusCircle } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, recentEvents, activities, loading } = useDashboard();

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans l'interface d'administration de la Jeunesse de Bière.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Membres</p>
                  <p className="text-2xl font-bold">{stats?.totalMembers}</p>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => navigate('/admin/membres')} 
                  className="text-sm text-primary hover:underline"
                >
                  Gérer les membres →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Événements</p>
                  <p className="text-2xl font-bold">{stats?.totalEvents}</p>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => navigate('/admin/evenements')} 
                  className="text-sm text-primary hover:underline"
                >
                  Gérer les événements →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Événements à venir</p>
                  <p className="text-2xl font-bold">{stats?.upcomingEvents}</p>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => navigate('/admin/evenements')} 
                  className="text-sm text-primary hover:underline"
                >
                  Voir le calendrier →
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Images du carrousel</p>
                  <p className="text-2xl font-bold">{stats?.totalCarouselImages}</p>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => navigate('/admin/carousel')} 
                  className="text-sm text-primary hover:underline"
                >
                  Gérer le carrousel →
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-display font-bold mb-4">Prochains événements</h2>
              
              {recentEvents.length > 0 ? (
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(event.date), 'd MMMM yyyy', { locale: fr })} à {event.time}
                          </p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/admin/evenements/${event.id}`)}
                        className="text-sm text-primary hover:underline"
                      >
                        Détails
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-gray-500">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Aucun événement à venir</span>
                </div>
              )}
              
              <div className="mt-6">
                <button 
                  onClick={() => handleQuickAction('/admin/evenements/ajouter')}
                  className="w-full btn btn-primary flex items-center justify-center"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Ajouter un événement
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-display font-bold mb-4">Activités récentes</h2>
              
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-0">
                      <div className={`bg-${activity.type === 'member' ? 'green' : 'blue'}-100 rounded-full p-2`}>
                        {activity.type === 'member' ? (
                          <Users className={`h-5 w-5 text-${activity.type === 'member' ? 'green' : 'blue'}-600`} />
                        ) : (
                          <Calendar className={`h-5 w-5 text-${activity.type === 'member' ? 'green' : 'blue'}-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(activity.date), 'dd/MM/yyyy HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-gray-500">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Aucune activité récente</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
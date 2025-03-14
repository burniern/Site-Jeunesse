import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EventCard from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

const EventsPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { events, loading } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState(events);
  
  // Filter events when date or events change
  useEffect(() => {
    if (events.length > 0) {
      const selectedMonth = date.getMonth();
      const selectedYear = date.getFullYear();
      
      const filtered = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
      });
      
      setFilteredEvents(filtered);
    }
  }, [date, events]);
  
  // Function to check if a date has events
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const hasEvent = events.some(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      
      return hasEvent ? <div className="h-2 w-2 bg-primary rounded-full mx-auto mt-1"></div> : null;
    }
    
    return null;
  };

  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Nos événements</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez tous les événements organisés par la Jeunesse de Bière. Utilisez le calendrier pour naviguer entre les différentes dates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-4">
              <h2 className="font-display font-bold text-xl mb-4">Calendrier</h2>
              <div className="calendar-container">
                <Calendar 
                  onChange={setDate} 
                  value={date}
                  locale="fr-FR"
                  tileContent={tileContent}
                  className="w-full border-none"
                />
              </div>
              <div className="mt-4 p-4 bg-light rounded-md">
                <h3 className="font-medium mb-2">Événements en {format(date, 'MMMM yyyy', { locale: fr })}</h3>
                {filteredEvents.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredEvents.map(event => (
                      <li key={event.id} className="text-sm">
                        <span className="font-medium">{format(new Date(event.date), 'd MMMM', { locale: fr })}</span> - {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Aucun événement ce mois-ci.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl mb-6">
              Événements en {format(date, 'MMMM yyyy', { locale: fr })}
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <p className="text-gray-500 mb-4">Aucun événement prévu pour ce mois.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setDate(new Date())}
                >
                  Voir les événements à venir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
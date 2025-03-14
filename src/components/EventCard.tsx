import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Event } from '../hooks/useEvents';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const eventDate = new Date(event.date);
  
  return (
    <div className={`card h-full flex flex-col ${featured ? 'border-l-4 border-primary' : ''}`}>
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-sm font-medium">
            À venir
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4 text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{format(eventDate, 'EEEE d MMMM yyyy', { locale: fr })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 flex-grow">{event.description}</p>
        
        <button className="btn btn-primary self-start mt-auto">
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default EventCard;
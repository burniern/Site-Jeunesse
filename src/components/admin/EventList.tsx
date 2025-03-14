import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface EventListProps {
  events: Event[];
  loading?: boolean;
  error?: string;
  onEventClick?: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, loading, error, onEventClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun événement à venir
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{event.title}</p>
              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{format(new Date(event.date), 'd MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
          {onEventClick && (
            <button 
              onClick={() => onEventClick(event.id)}
              className="text-sm text-primary hover:underline"
            >
              Détails
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
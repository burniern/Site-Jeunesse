import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Users, Calendar } from 'lucide-react';

interface Activity {
  type: 'member' | 'event';
  description: string;
  date: string;
}

interface ActivityListProps {
  activities: Activity[];
  loading?: boolean;
  error?: string;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, loading, error }) => {
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

  if (!activities.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune activité récente
      </div>
    );
  }

  return (
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
  );
};

export default ActivityList;
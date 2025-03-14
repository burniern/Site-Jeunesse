import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  onClick?: () => void;
  linkText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  onClick,
  linkText
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-full p-3 mr-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {onClick && linkText && (
        <div className="mt-4">
          <button 
            onClick={onClick}
            className="text-sm text-primary hover:underline"
          >
            {linkText} →
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
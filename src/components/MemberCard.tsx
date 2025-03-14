import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Member } from '../hooks/useMembers';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="relative h-64">
        <img 
          src={member.photo} 
          alt={`${member.first_name} ${member.last_name}`} 
          className="w-full h-full object-cover"
        />
        {member.role && (
          <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 text-sm font-medium">
            {member.role}
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-display font-bold text-xl mb-1">
          {member.first_name} {member.last_name}
        </h3>
        
        <div className="space-y-2 mt-2 text-gray-600">
          {member.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                {member.email}
              </a>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                {member.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
import React from 'react';
import MemberCard from '../components/MemberCard';
import { useMembers } from '../hooks/useMembers';

const MembersPage: React.FC = () => {
  const { members, loading } = useMembers();

  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Nos membres</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez les membres qui composent la Jeunesse de Bière. Une équipe dynamique et passionnée qui œuvre pour animer notre village.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun membre pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
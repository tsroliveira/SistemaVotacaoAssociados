
import React from 'react';
import CastVoteForm from '@/components/voting/CastVoteForm';
import { useTheme } from '@/context/ThemeContext';

const CastVote: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Registrar Voto</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Participe das votações ativas</p>
      </div>
      
      <CastVoteForm />
    </div>
  );
};

export default CastVote;

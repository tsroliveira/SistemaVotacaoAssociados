
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VotingResults from '@/components/voting/VotingResults';
import { useTheme } from '@/context/ThemeContext';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState<number | undefined>(undefined);
  const { theme } = useTheme();
  
  useEffect(() => {
    const id = searchParams.get('sessionId');
    if (id) {
      setSessionId(parseInt(id, 10));
    }
  }, [searchParams]);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Resultados das Votações</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Visualize os resultados das sessões de votação</p>
      </div>
      
      <VotingResults sessionId={sessionId} />
    </div>
  );
};

export default Results;

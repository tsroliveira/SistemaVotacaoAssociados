
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VotingSessionsList from '@/components/voting/VotingSessionsList';
import VotingSessionForm from '@/components/voting/VotingSessionForm';
import { useTheme } from '@/context/ThemeContext';

const VotingSessions: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleAddSession = () => {
    setEditingSession(null);
    setShowForm(true);
  };
  
  const handleEditSession = (session: any) => {
    // Convert string dates to Date objects
    const startParts = session.startDate.split('/');
    const endParts = session.endDate.split('/');
    
    const sessionWithDateObjects = {
      ...session,
      startDate: new Date(startParts[2], startParts[1] - 1, startParts[0]),
      endDate: new Date(endParts[2], endParts[1] - 1, endParts[0])
    };
    
    setEditingSession(sessionWithDateObjects);
    setShowForm(true);
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSession(null);
  };
  
  const handleViewResults = (sessionId: number) => {
    navigate(`/results?sessionId=${sessionId}`);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Sessões de Votação</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Gerenciamento de sessões de votação</p>
      </div>
      
      {showForm ? (
        <VotingSessionForm 
          onCancel={handleCancelForm} 
          initialData={editingSession} 
        />
      ) : (
        <VotingSessionsList 
          onAddSession={handleAddSession} 
          onEditSession={handleEditSession}
          onViewResults={handleViewResults}
        />
      )}
    </div>
  );
};

export default VotingSessions;

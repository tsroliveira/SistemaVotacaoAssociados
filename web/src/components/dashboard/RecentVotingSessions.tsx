
import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from '@/context/ThemeContext';

interface VotingSession {
  id: number;
  title: string;
  status: 'active' | 'closed' | 'upcoming';
  totalVotes: number;
  start: string;
  end: string;
}

const RecentVotingSessions: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock data
  const sessions: VotingSession[] = [
    {
      id: 1,
      title: 'Aprovação do Orçamento 2025',
      status: 'active',
      totalVotes: 357,
      start: '2025-04-28',
      end: '2025-05-10'
    },
    {
      id: 2,
      title: 'Eleição para o Conselho Diretor',
      status: 'active',
      totalVotes: 459,
      start: '2025-04-25',
      end: '2025-05-08'
    },
    {
      id: 3,
      title: 'Alteração do Estatuto Social',
      status: 'closed',
      totalVotes: 684,
      start: '2025-04-10',
      end: '2025-04-20'
    },
    {
      id: 4,
      title: 'Aprovação de Obras nas Áreas Comuns',
      status: 'upcoming',
      totalVotes: 0,
      start: '2025-05-15',
      end: '2025-05-30'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativa</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Encerrada</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Futura</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <Check className="h-4 w-4 text-gray-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>
          Sessões de Votação Recentes
        </h2>
        <Button variant="outline" size="sm" className={theme === 'dark' ? 'text-blue-400' : 'text-vote-blue'}>
          Ver todas <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className={`p-4 ${
              theme === 'dark' 
                ? 'border-gray-700 hover:bg-gray-700' 
                : 'border-gray-100 hover:bg-gray-50'
            } border rounded-lg transition-colors`}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : ''}`}>
                  {session.title}
                </h3>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {getStatusIcon(session.status)}
                  <span>{session.start} até {session.end}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(session.status)}
                {session.status !== 'upcoming' && 
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                    {session.totalVotes} votos
                  </span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVotingSessions;


import React, { useState } from 'react';
import { Search, Plus, Calendar, Edit, Trash, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VotingSession {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed' | 'upcoming';
  totalVotes: number;
}

interface VotingSessionsListProps {
  onAddSession: () => void;
  onEditSession: (session: VotingSession) => void;
  onViewResults: (sessionId: number) => void;
}

const VotingSessionsList: React.FC<VotingSessionsListProps> = ({ 
  onAddSession, 
  onEditSession,
  onViewResults
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const sessions: VotingSession[] = [
    {
      id: 1,
      title: 'Aprovação do Orçamento 2025',
      description: 'Votação para aprovação do plano orçamentário para o ano de 2025',
      startDate: '28/04/2025',
      endDate: '10/05/2025',
      status: 'active',
      totalVotes: 357
    },
    {
      id: 2,
      title: 'Eleição para o Conselho Diretor',
      description: 'Eleição dos membros para compor o conselho diretor no próximo biênio',
      startDate: '25/04/2025',
      endDate: '08/05/2025',
      status: 'active',
      totalVotes: 459
    },
    {
      id: 3,
      title: 'Alteração do Estatuto Social',
      description: 'Votação para alterar cláusulas específicas do estatuto social',
      startDate: '10/04/2025',
      endDate: '20/04/2025',
      status: 'closed',
      totalVotes: 684
    },
    {
      id: 4,
      title: 'Aprovação de Obras nas Áreas Comuns',
      description: 'Votação para aprovação do projeto de reforma das áreas comuns',
      startDate: '15/05/2025',
      endDate: '30/05/2025',
      status: 'upcoming',
      totalVotes: 0
    }
  ];

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar sessões de votação..."
            className="pl-10 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onAddSession}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Sessão
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Votos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{session.title}</p>
                      <p className="text-sm text-gray-500">{session.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{session.startDate} - {session.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>{session.totalVotes}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onViewResults(session.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEditSession(session)}
                        disabled={session.status === 'closed'}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        disabled={session.status !== 'upcoming'}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  Nenhuma sessão encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VotingSessionsList;

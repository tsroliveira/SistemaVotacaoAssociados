
import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from '@/context/ThemeContext';
import { associatesApi } from '@/services/api';

interface Member {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataHora: string;
  isActive: boolean;
}

interface MembersListProps {
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
}

interface Member {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataHora: string;
  isActive: boolean;
}

interface MembersListProps {
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
}

const MembersList: React.FC<MembersListProps> = ({ onAddMember, onEditMember }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await associatesApi.getAll();
        setMembers(response.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar associados.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => 
    (member.nome?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
    (member.email?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
    (member.cpf ?? '').includes(searchTerm)
  );
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar associados..."
            className="pl-10 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onAddMember}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Associado
        </Button>
      </div>
      
      <div className={`rounded-md border ${theme === 'dark' ? 'border-gray-700' : ''}`}>
        <Table>
          <TableHeader>
            <TableRow className={theme === 'dark' ? 'hover:bg-gray-800' : ''}>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data de Registro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id} className={theme === 'dark' ? 'hover:bg-gray-800' : ''}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" /> {member.nome}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.cpf}</TableCell>
                  <TableCell>{(member.dataHora.split('T')[0])}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEditMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  Nenhum associado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersList;

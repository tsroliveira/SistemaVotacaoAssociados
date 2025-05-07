
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from '@/context/ThemeContext';

interface VotingResult {
  id: number;
  sessionId: number;
  sessionTitle: string;
  totalVotes: number;
  approvalVotes: number;
  rejectionVotes: number;
  abstentionVotes: number;
  startDate: string;
  endDate: string;
}

interface VotingResultsProps {
  sessionId?: number;
}

const chartColors = ["#3B82F6", "#EF4444", "#A3A3A3"];

const VotingResults: React.FC<VotingResultsProps> = ({ sessionId }) => {
  const { theme } = useTheme();
  
  // Mock data
  const results: VotingResult[] = [
    {
      id: 1,
      sessionId: 1,
      sessionTitle: "Aprovação do Orçamento 2025",
      totalVotes: 357,
      approvalVotes: 218,
      rejectionVotes: 98,
      abstentionVotes: 41,
      startDate: "28/04/2025",
      endDate: "10/05/2025"
    },
    {
      id: 2,
      sessionId: 2,
      sessionTitle: "Eleição para o Conselho Diretor",
      totalVotes: 459,
      approvalVotes: 285,
      rejectionVotes: 142,
      abstentionVotes: 32,
      startDate: "25/04/2025",
      endDate: "08/05/2025"
    },
    {
      id: 3,
      sessionId: 3,
      sessionTitle: "Alteração do Estatuto Social",
      totalVotes: 684,
      approvalVotes: 398,
      rejectionVotes: 230,
      abstentionVotes: 56,
      startDate: "10/04/2025",
      endDate: "20/04/2025"
    }
  ];
  
  // Filter results if sessionId is provided, otherwise show all
  const filteredResults = sessionId 
    ? results.filter(result => result.sessionId === sessionId)
    : results;

  const getChartData = (result: VotingResult) => [
    { name: "Aprovação", value: result.approvalVotes },
    { name: "Rejeição", value: result.rejectionVotes },
    { name: "Abstenção", value: result.abstentionVotes }
  ];

  return (
    <div className="space-y-8">
      {filteredResults.map(result => (
        <Card key={result.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{result.sessionTitle}</CardTitle>
            <CardDescription>
              Período: {result.startDate} - {result.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getChartData(result)}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getChartData(result).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} votos`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col justify-center">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resultado</TableHead>
                      <TableHead className="text-right">Votos</TableHead>
                      <TableHead className="text-right">Percentual</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Aprovação</TableCell>
                      <TableCell className="text-right">{result.approvalVotes}</TableCell>
                      <TableCell className="text-right">
                        {((result.approvalVotes / result.totalVotes) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rejeição</TableCell>
                      <TableCell className="text-right">{result.rejectionVotes}</TableCell>
                      <TableCell className="text-right">
                        {((result.rejectionVotes / result.totalVotes) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Abstenção</TableCell>
                      <TableCell className="text-right">{result.abstentionVotes}</TableCell>
                      <TableCell className="text-right">
                        {((result.abstentionVotes / result.totalVotes) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total de Votos</TableCell>
                      <TableCell className="text-right">{result.totalVotes}</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-md`}>
                  <h4 className="font-medium mb-2">Resultado Final</h4>
                  <p className={`text-lg font-bold ${
                    theme === 'dark' 
                      ? (result.approvalVotes > result.rejectionVotes ? 'text-blue-400' : 'text-red-400')
                      : (result.approvalVotes > result.rejectionVotes ? 'text-vote-blue' : 'text-red-600')
                  }`}>
                    {result.approvalVotes > result.rejectionVotes ? "APROVADO" : "REJEITADO"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredResults.length === 0 && (
        <div className={`text-center p-8 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} rounded-lg shadow`}>
          <p>Nenhum resultado de votação disponível</p>
        </div>
      )}
    </div>
  );
};

export default VotingResults;

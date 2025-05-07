
import React from 'react';
import { Users, Vote, Check, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="vote-stats-card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total de Associados"
        value="1,248"
        icon={<Users className="h-5 w-5 text-vote-blue" />}
        trend="12% mais que o mês passado"
        trendUp={true}
      />
      <StatCard 
        title="Sessões de Votação"
        value="42"
        icon={<Vote className="h-5 w-5 text-vote-blue" />}
        trend="5 novas este mês"
        trendUp={true}
      />
      <StatCard 
        title="Votos Realizados"
        value="8,563"
        icon={<Check className="h-5 w-5 text-vote-blue" />}
        trend="23% mais que o mês passado"
        trendUp={true}
      />
      <StatCard 
        title="Sessões Ativas"
        value="7"
        icon={<Clock className="h-5 w-5 text-vote-blue" />}
      />
    </div>
  );
};

export default DashboardStats;

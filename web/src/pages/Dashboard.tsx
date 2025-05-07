
import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentVotingSessions from '@/components/dashboard/RecentVotingSessions';
import { useTheme } from '@/context/ThemeContext';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Dashboard</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Visão geral do sistema de votação</p>
      </div>
      
      <DashboardStats />
      
      <RecentVotingSessions />
    </div>
  );
};

export default Dashboard;

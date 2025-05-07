
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Vote, Check, Settings } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { theme } = useTheme();
  
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      title: 'Associados',
      icon: Users,
      path: '/members'
    },
    {
      title: 'Sessões de Votação',
      icon: Vote,
      path: '/voting-sessions'
    },
    {
      title: 'Votar',
      icon: Check,
      path: '/cast-vote'
    },
    {
      title: 'Resultados',
      icon: Check,
      path: '/results'
    }
  ];

  return (
    <aside 
      className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r h-screen fixed top-0 left-0 transition-all duration-300 z-10 pt-20 md:pt-4 ${
        isOpen ? 'w-64' : 'w-0 md:w-20'
      } overflow-hidden shadow-md`}
    >
      <div className="px-4 md:px-2 py-4 md:py-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? theme === 'dark' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-vote-blue text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className={`h-5 w-5 ${isOpen ? 'md:mr-0' : 'md:mx-auto'}`} />
              <span className={`whitespace-nowrap transition-opacity ${
                isOpen ? 'opacity-100' : 'md:opacity-0'
              }`}>
                {item.title}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

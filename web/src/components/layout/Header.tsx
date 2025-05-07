
import React from 'react';
import { Menu, Bell, Vote, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm py-4 px-6 flex justify-between items-center transition-colors duration-200`}>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Vote className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-vote-blue'}`} />
          <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-vote-blue'}`}>
            AssociadoVoteHub
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className={`rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-blue-500' : 'bg-vote-blue'} rounded-full flex items-center justify-center text-white`}>
            A
          </div>
          <span className={`text-sm font-medium hidden md:inline ${theme === 'dark' ? 'text-gray-200' : ''}`}>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

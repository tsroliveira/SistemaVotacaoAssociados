
import React, { useState } from 'react';
import MembersList from '@/components/members/MembersList';
import MemberForm from '@/components/members/MemberForm';
import { useTheme } from '@/context/ThemeContext';

const Members: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const { theme } = useTheme();
  
  const handleAddMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };
  
  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setShowForm(true);
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Associados</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Gerenciamento de associados</p>
      </div>
      
      {showForm ? (
        <MemberForm 
          onCancel={handleCancelForm} 
          initialData={editingMember} 
        />
      ) : (
        <MembersList 
          onAddMember={handleAddMember} 
          onEditMember={handleEditMember} 
        />
      )}
    </div>
  );
};

export default Members;

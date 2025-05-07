
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Vote, ArrowRight, Users, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-3xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <Vote className="h-16 w-16 text-vote-blue animate-pulse-slow" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-vote-blue">
          AssociadoVoteHub
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Sistema de Votação de Associados - Uma plataforma moderna para gerenciar votações com segurança, transparência e facilidade.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="vote-card">
            <Vote className="h-10 w-10 text-vote-blue-light mb-4" />
            <h3 className="text-lg font-semibold mb-2">Votações Seguras</h3>
            <p className="text-gray-500 mb-4">Organize votações protegidas com validação de identidade dos associados.</p>
          </div>
          
          <div className="vote-card">
            <Users className="h-10 w-10 text-vote-blue-light mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gestão de Associados</h3>
            <p className="text-gray-500 mb-4">Mantenha um cadastro organizado de todos os associados com direito a voto.</p>
          </div>
          
          <div className="vote-card">
            <Check className="h-10 w-10 text-vote-blue-light mb-4" />
            <h3 className="text-lg font-semibold mb-2">Resultados em Tempo Real</h3>
            <p className="text-gray-500 mb-4">Acompanhe os resultados das votações com visualizações claras e detalhadas.</p>
          </div>
        </div>
        
        <Link to="/dashboard">
          <Button className="text-lg px-6 py-6 rounded-full bg-vote-blue hover:bg-vote-blue-light">
            Acessar o Sistema <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;

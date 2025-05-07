
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from '@/context/ThemeContext';

interface VotingSession {
  id: string;
  title: string;
  description: string;
}

const formSchema = z.object({
  sessionId: z.string({
    required_error: "Por favor selecione uma sessão de votação",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { 
    message: 'CPF inválido. Use o formato 123.456.789-00' 
  }),
  vote: z.enum(['sim', 'nao', 'abstencao'], {
    required_error: "Por favor selecione uma opção de voto",
  }),
});

const CastVoteForm: React.FC = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();
  
  // Mock data
  const activeSessions: VotingSession[] = [
    {
      id: "1",
      title: "Aprovação do Orçamento 2025",
      description: "Votação para aprovação do plano orçamentário para o ano de 2025"
    },
    {
      id: "2",
      title: "Eleição para o Conselho Diretor",
      description: "Eleição dos membros para compor o conselho diretor no próximo biênio"
    }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionId: "",
      cpf: "",
      vote: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      const sessionTitle = activeSessions.find(s => s.id === values.sessionId)?.title;
      
      setSubmitting(false);
      setSuccess(true);
      
      toast({
        title: "Voto registrado com sucesso!",
        description: `Seu voto para '${sessionTitle}' foi registrado.`,
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  const selectedSession = form.watch('sessionId') 
    ? activeSessions.find(s => s.id === form.watch('sessionId')) 
    : null;

  return (
    <div className="max-w-md mx-auto">
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
        <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : ''}`}>
          Registrar Voto
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>
                    Sessão de Votação
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={submitting || success}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma sessão de votação" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeSessions.map((session) => (
                          <SelectItem key={session.id} value={session.id}>
                            {session.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedSession && (
              <div className={`${
                theme === 'dark' ? 'bg-blue-900/30 text-gray-200' : 'bg-blue-50'
              } p-4 rounded-md text-sm`}>
                <p className="font-medium mb-1">Descrição:</p>
                <p>{selectedSession.description}</p>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>
                    CPF do Associado
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123.456.789-00" 
                      {...field} 
                      disabled={submitting || success}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vote"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>
                    Seu Voto
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={submitting || success}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="sim" />
                        </FormControl>
                        <FormLabel className={`font-normal ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                          Sim - Aprovo
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nao" />
                        </FormControl>
                        <FormLabel className={`font-normal ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                          Não - Rejeito
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="abstencao" />
                        </FormControl>
                        <FormLabel className={`font-normal ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                          Abstenção
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={submitting || success}
            >
              {submitting && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {success && <Check className="mr-2 h-4 w-4" />}
              {submitting ? 'Registrando...' : success ? 'Voto Registrado!' : 'Registrar Voto'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CastVoteForm;

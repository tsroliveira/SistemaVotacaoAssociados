
import React from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from '@/context/ThemeContext';

interface MemberFormProps {
  onCancel: () => void;
  initialData?: {
    id?: number;
    nome?: string;
    email?: string;
    cpf?: string;
    isActive?: boolean;
  };
}

const formSchema = z.object({
  nome: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido. Use o formato 123.456.789-00' }),
  isActive: z.boolean().default(true),
});

const MemberForm: React.FC<MemberFormProps> = ({ onCancel, initialData = {} }) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const isEditing = !!initialData.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: initialData.nome || '',
      email: initialData.email || '',
      cpf: initialData.cpf || '',
      isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically call an API to save the data
    console.log('Form values:', values);
    
    toast({
      title: isEditing ? "Associado atualizado!" : "Associado adicionado!",
      description: `${values.nome} foi ${isEditing ? 'atualizado' : 'adicionado'} com sucesso.`,
    });
    
    onCancel();
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className="text-xl font-semibold mb-6">{isEditing ? 'Editar Associado' : 'Adicionar Associado'}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="123.456.789-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className={theme === 'dark' ? 'text-gray-200' : ''}>Associado Ativo</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Atualizar' : 'Adicionar'} Associado
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MemberForm;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { profileService } from '@/services/profile.service';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { AlertCircle, Trash2, Loader2 } from 'lucide-react';

export function DeleteAccountCard() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Somente administradores podem desativar contas
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await profileService.deactivateAccount();
      toast.success('Conta desativada com sucesso');
      logout();
      router.push('/login');
    } catch (error: unknown) {
      console.error('Error deleting account:', error);
      const message =
        typeof error === 'object' && error !== null && 'response' in error &&
        (error as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Erro ao excluir conta. Tente novamente.';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          Zona de Perigo
        </CardTitle>
        <CardDescription>
          Gerenciamento de conta e ações sensíveis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-destructive">Desativar conta</h4>
            <p className="text-sm text-muted-foreground">
              Ao desativar sua conta, você perderá acesso ao sistema. Seus dados e históricos
              permanecerão armazenados para fins de registro e conformidade.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar conta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tem certeza que deseja desativar sua conta?</DialogTitle>
                <DialogDescription>
                  Você será desconectado e não poderá mais acessar o sistema com este usuário.
                  Seus dados não serão apagados, mas sua conta ficará inativa.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancelar</Button>
                </DialogClose>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  type="button"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Desativando...
                    </>
                  ) : (
                    'Sim, desativar minha conta'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeleteAccountCard;

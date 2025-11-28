'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { MainLayout } from '@/components/layout';
import { PageHeader, LoadingSkeleton } from '@/components/shared';
import { ProfileHeader, ProfileForm, DeleteAccountCard, ProfileCompletion, ProfileHistory } from '@/components/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { m } from '@/lib/motion-provider';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { profileService } from '@/services/profile.service';
import { ProfileFormData } from '@/lib/schemas/profile.schema';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Calendar,
  Eye,
  Pencil,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { formatPhone } from '@/lib/phone';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('view');

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => profileService.updateProfile(data),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
      setActiveTab('view');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao atualizar perfil. Tente novamente.');
    },
  });

  // Mutation for uploading avatar
  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => profileService.uploadAvatar(file),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      toast.success('Foto atualizada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao enviar foto. Tente novamente.');
    },
  });

  // Mutation for removing avatar
  const removeAvatarMutation = useMutation({
    mutationFn: () => profileService.removeAvatar(),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      toast.success('Foto removida com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao remover foto. Tente novamente.');
    },
  });

  const handleProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const handleAvatarUpload = async (file: File) => {
    await uploadAvatarMutation.mutateAsync(file);
  };

  const handleAvatarRemove = async () => {
    await removeAvatarMutation.mutateAsync();
  };






  if (!isAuthenticated || !user) {
    return (
      <MainLayout>
        <div className="space-y-8">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </MainLayout>
    );
  }

  // Format birth date for display
  const formattedBirthDate = user.birthDate
    ? new Date(user.birthDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;

  return (
    <MainLayout>
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Page Header */}
        <m.div variants={staggerItem}>
          <PageHeader
            title="Meu Perfil"
            description="Visualize e gerencie suas informações pessoais."
          />
        </m.div>

        {/* Profile Header Card */}
        <m.div variants={staggerItem}>
          <Card>
            <CardContent className="p-0">
              <ProfileHeader
                user={user}
                onAvatarUpload={handleAvatarUpload}
                onAvatarRemove={handleAvatarRemove}
                isAvatarUploading={uploadAvatarMutation.isPending}
                isAvatarRemoving={removeAvatarMutation.isPending}
              />
            </CardContent>
          </Card>
        </m.div>

        {/* Tabs for View/Edit */}
        <m.div variants={staggerItem}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="view" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visualizar
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Editar
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            {/* View Tab Content */}
            <TabsContent value="view" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Completion Indicator */}
                <div className="lg:col-span-2">
                  <ProfileCompletion user={user} />
                </div>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-primary" />
                      Informações Pessoais
                    </CardTitle>
                    <CardDescription>Seus dados cadastrais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ProfileInfoItem
                      label="Nome completo"
                      value={user.name}
                    />
                    <ProfileInfoItem
                      label="E-mail"
                      value={user.email}
                    />
                    <ProfileInfoItem
                      label="CPF"
                      value={user.cpf || 'Não informado'}
                    />
                    <ProfileInfoItem
                      icon={Calendar}
                      label="Data de nascimento"
                      value={formattedBirthDate || 'Não informada'}
                    />
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Informações de Contato
                    </CardTitle>
                    <CardDescription>Telefone e endereço</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ProfileInfoItem
                      icon={Phone}
                      label="Telefone"
                      value={formatPhone(user.phone)}
                    />
                    <ProfileInfoItem
                      icon={MapPin}
                      label="Endereço"
                      value={user.address || 'Não informado'}
                    />
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Contato de Emergência
                    </CardTitle>
                    <CardDescription>
                      Pessoa a ser contatada em caso de emergência
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ProfileInfoItem
                        label="Nome do contato"
                        value={user.emergencyContact || 'Não informado'}
                      />
                      <ProfileInfoItem
                        icon={Phone}
                        label="Telefone de emergência"
                        value={formatPhone(user.emergencyPhone)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delete Account */}
                <div className="lg:col-span-2">
                  <DeleteAccountCard />
                </div>
              </div>
            </TabsContent>

            {/* Edit Tab Content */}
            <TabsContent value="edit" className="mt-6">
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-primary" />
                      Editar Perfil
                    </CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais. Campos com * são obrigatórios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm
                      user={user}
                      onSubmit={handleProfileSubmit}
                      isLoading={updateProfileMutation.isPending}
                    />
                  </CardContent>
                </Card>
            </TabsContent>

            {/* History Tab Content */}
            <TabsContent value="history" className="mt-6">
              <ProfileHistory />
            </TabsContent>
          </Tabs>
        </m.div>
      </m.div>
    </MainLayout>
  );
}

/**
 * Helper component for displaying profile information
 */
interface ProfileInfoItemProps {
  icon?: React.ElementType;
  label: string;
  value: string;
}

function ProfileInfoItem({ icon: Icon, label, value }: ProfileInfoItemProps) {
  const isEmpty = value === 'Não informado' || value === 'Não informada';

  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <Icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className={`text-sm ${isEmpty ? 'text-muted-foreground/70 italic' : 'text-foreground'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

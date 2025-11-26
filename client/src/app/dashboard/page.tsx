'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { m } from '@/lib/motion-provider';
import { 
  Calendar, 
  Pill, 
  AlertCircle, 
  FileText
} from 'lucide-react';

import { useAuthStore } from '@/stores/auth.store';
import { dashboardService } from '@/services/dashboard.service';
import { MainLayout } from '@/components/layout';
import { PageHeader, EmptyState, LoadingSkeleton } from '@/components/shared';
import { 
  StatCard, 
  AlertBanner, 
  AlertList,
  AppointmentItem, 
  MedicationItem 
} from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/lib/motion';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardData,
    enabled: !!user,
  });

  const handleDismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId]);
  };

  // Filter out dismissed alerts
  const activeAlerts = dashboardData?.alerts?.filter(
    (alert) => !dismissedAlerts.includes(alert.id)
  ) || [];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-8">
          {/* Stats Grid Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} variant="stat-card" />
            ))}
          </div>
          
          {/* Content Loading */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
          </div>
        </div>
      </MainLayout>
    );
  }

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
            title={`Olá, ${user?.name?.split(' ')[0] || 'Cuidador'}!`}
            description="Aqui está o resumo do dia para acompanhamento do paciente."
          />
        </m.div>

        {/* Stats Grid */}
        <m.div 
          variants={staggerItem}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            icon={Calendar}
            label="Compromissos Próximos"
            value={dashboardData?.upcomingAppointments?.length || 0}
            variant="primary"
            trend={
              dashboardData?.upcomingAppointments?.length 
                ? { direction: 'neutral' as const, value: 'Esta semana' }
                : undefined
            }
          />
          <StatCard
            icon={Pill}
            label="Medicações Hoje"
            value={dashboardData?.todayMedications?.length || 0}
            variant="success"
            trend={
              dashboardData?.todayMedications?.length
                ? { direction: 'neutral' as const, value: 'Agendar lembretes' }
                : undefined
            }
          />
          <StatCard
            icon={AlertCircle}
            label="Alertas Ativos"
            value={activeAlerts.length}
            variant={activeAlerts.length > 0 ? 'warning' : 'default'}
            trend={
              activeAlerts.length > 0
                ? { direction: 'up' as const, value: 'Requer atenção' }
                : { direction: 'down' as const, value: 'Tudo em ordem' }
            }
          />
          <StatCard
            icon={FileText}
            label="Exames Recentes"
            value={dashboardData?.recentExams?.length || 0}
            variant="default"
            trend={
              dashboardData?.recentExams?.length
                ? { direction: 'neutral' as const, value: 'Últimos 30 dias' }
                : undefined
            }
          />
        </m.div>

        {/* Alerts Section */}
        {activeAlerts.length > 0 && (
          <m.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Alertas
                </CardTitle>
                <CardDescription>Itens que requerem sua atenção</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertList>
                  {activeAlerts.map((alert) => (
                    <AlertBanner
                      key={alert.id}
                      severity={alert.severity as 'info' | 'warning' | 'error' | 'success'}
                      title={alert.message}
                      description={new Date(alert.createdAt).toLocaleString('pt-BR')}
                      dismissible
                      onDismiss={() => handleDismissAlert(alert.id)}
                    />
                  ))}
                </AlertList>
              </CardContent>
            </Card>
          </m.div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointments */}
          <m.div variants={staggerItem}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Próximos Compromissos
                </CardTitle>
                <CardDescription>Agendamentos médicos do paciente</CardDescription>
              </CardHeader>
              <CardContent>
                {!dashboardData?.upcomingAppointments?.length ? (
                  <EmptyState
                    icon={Calendar}
                    title="Nenhum compromisso agendado"
                    description="Os próximos compromissos aparecerão aqui."
                    action={{
                      label: 'Agendar consulta',
                      onClick: () => {/* TODO: Navigate to appointments */},
                    }}
                  />
                ) : (
                  <m.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {dashboardData.upcomingAppointments.map((appointment) => (
                      <m.div key={appointment.id} variants={staggerItem}>
                        <AppointmentItem
                          doctor={{
                            name: appointment.doctorName,
                            specialty: appointment.specialty,
                          }}
                          datetime={new Date(appointment.date)}
                          location={appointment.location}
                          status={appointment.status || 'scheduled'}
                        />
                      </m.div>
                    ))}
                  </m.div>
                )}
              </CardContent>
            </Card>
          </m.div>

          {/* Medications */}
          <m.div variants={staggerItem}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-success" />
                  Medicações de Hoje
                </CardTitle>
                <CardDescription>Horários e dosagens programados</CardDescription>
              </CardHeader>
              <CardContent>
                {!dashboardData?.todayMedications?.length ? (
                  <EmptyState
                    icon={Pill}
                    title="Nenhuma medicação para hoje"
                    description="As medicações programadas aparecerão aqui."
                    action={{
                      label: 'Adicionar medicação',
                      onClick: () => {/* TODO: Navigate to medications */},
                    }}
                  />
                ) : (
                  <m.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {dashboardData.todayMedications.map((medication) => (
                      <m.div key={medication.id} variants={staggerItem}>
                        <MedicationItem
                          name={medication.name}
                          dosage={medication.dosage}
                          frequency={medication.frequency}
                          status={medication.isActive ? 'active' : 'paused'}
                          nextDose={medication.nextDose ? new Date(medication.nextDose) : undefined}
                        />
                      </m.div>
                    ))}
                  </m.div>
                )}
              </CardContent>
            </Card>
          </m.div>
        </div>

        {/* Recent Exams */}
        {dashboardData?.recentExams && dashboardData.recentExams.length > 0 && (
          <m.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Exames Recentes
                </CardTitle>
                <CardDescription>Últimos resultados e anexos</CardDescription>
              </CardHeader>
              <CardContent>
                <m.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {dashboardData.recentExams.map((exam) => (
                    <m.div
                      key={exam.id}
                      variants={staggerItem}
                      className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{exam.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString('pt-BR')}
                        </p>
                        {exam.result && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium text-foreground">Resultado:</span> {exam.result}
                          </p>
                        )}
                        {exam.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {exam.notes}
                          </p>
                        )}
                      </div>
                      {exam.attachments && exam.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-primary font-medium">
                          <FileText className="h-4 w-4" />
                          {exam.attachments.length}
                        </div>
                      )}
                    </m.div>
                  ))}
                </m.div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </m.div>
    </MainLayout>
  );
}


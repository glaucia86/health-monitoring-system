import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { MedicationsModule } from './medications/medications.module';
import { ExamsModule } from './exams/exams.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DocumentsModule } from './documents/documents.module';
import { SchedulesModule } from './schedules/schedules.module';
import { IntakesModule } from './intakes/intakes.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    PrismaModule,
    UsersModule,
    PatientsModule,
    MedicationsModule,
    ExamsModule,
    AppointmentsModule,
    DocumentsModule,
    SchedulesModule,
    IntakesModule,
    AuthModule,
    DashboardModule,
    NotificationsModule,
    ChatModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

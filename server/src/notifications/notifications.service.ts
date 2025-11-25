import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (apiKey) {
      sgMail.setApiKey(apiKey);
    } else {
      this.logger.warn('SENDGRID_API_KEY not configured. Email notifications disabled.');
    }
  }

  // Run every hour to check for upcoming medication reminders
  @Cron(CronExpression.EVERY_HOUR)
  async checkMedicationReminders() {
    this.logger.log('Checking medication reminders...');

    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const currentDay = now.getDay();

    // Get all active medication schedules
    const schedules = await this.prisma.medicationSchedule.findMany({
      where: {
        active: true,
      },
      include: {
        medication: {
          include: {
            patient: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    for (const schedule of schedules) {
      // Check if today is in the schedule's daysOfWeek
      if (!schedule.daysOfWeek.includes(currentDay)) {
        continue;
      }

      // Parse schedule time (format: "HH:mm")
      const [hours, minutes] = schedule.time.split(':').map(Number);
      const scheduleTime = new Date();
      scheduleTime.setHours(hours, minutes, 0, 0);

      // If schedule time is within the next hour, send reminder
      if (scheduleTime >= now && scheduleTime <= nextHour) {
        await this.sendMedicationReminder(schedule);
      }
    }
  }

  private async sendMedicationReminder(schedule: any) {
    const { medication } = schedule;
    const { patient } = medication;

    if (!patient.user?.email) {
      this.logger.warn(`No email found for patient ${patient.id}`);
      return;
    }

    const fromEmail = process.env.FROM_EMAIL || 'noreply@healthapp.com';

    const msg = {
      to: patient.user.email,
      from: fromEmail,
      subject: `Lembrete: ${medication.name}`,
      text: `Olá ${patient.name},\n\nEste é um lembrete para tomar sua medicação:\n\nMedicação: ${medication.name}\nDosagem: ${medication.dosage}\nHorário: ${schedule.time}\n\nCuide-se bem!`,
      html: `
        <h2>Lembrete de Medicação</h2>
        <p>Olá <strong>${patient.name}</strong>,</p>
        <p>Este é um lembrete para tomar sua medicação:</p>
        <ul>
          <li><strong>Medicação:</strong> ${medication.name}</li>
          <li><strong>Dosagem:</strong> ${medication.dosage}</li>
          <li><strong>Horário:</strong> ${schedule.time}</li>
        </ul>
        <p>Cuide-se bem!</p>
      `,
    };

    try {
      if (process.env.SENDGRID_API_KEY) {
        await sgMail.send(msg);
        this.logger.log(`Reminder sent to ${patient.user.email} for ${medication.name}`);
      } else {
        this.logger.log(`[DRY RUN] Would send reminder to ${patient.user.email} for ${medication.name}`);
      }

      // Create a notification record (optional - you could add a Notification model to track this)
      // await this.prisma.notification.create({...})
    } catch (error) {
      this.logger.error(`Failed to send reminder to ${patient.user.email}:`, error);
    }
  }

  // Manual trigger for testing
  async sendTestReminder(patientId: string) {
    const medications = await this.prisma.medication.findMany({
      where: { patientId },
      include: {
        schedules: {
          where: { active: true },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
      take: 1,
    });

    if (medications.length > 0 && medications[0].schedules.length > 0) {
      await this.sendMedicationReminder(medications[0].schedules[0]);
      return { success: true, message: 'Test reminder sent' };
    }

    return { success: false, message: 'No active medication schedules found' };
  }
}

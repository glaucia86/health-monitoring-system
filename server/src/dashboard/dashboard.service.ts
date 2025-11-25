import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getPatientOverview(patientId: string) {
    // Get recent exams
    const recentExams = await this.prisma.exam.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
      take: 5,
    });

    // Get upcoming appointments
    const upcomingAppointments = await this.prisma.appointment.findMany({
      where: {
        patientId,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
      take: 5,
    });

    // Get active medications
    const activeMedications = await this.prisma.medication.findMany({
      where: {
        patientId,
        OR: [
          { endDate: null },
          { endDate: { gte: new Date() } },
        ],
      },
      include: {
        schedules: {
          where: { active: true },
        },
      },
    });

    // Get upcoming medication intakes (today and tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // This would require more complex logic with schedules
    // For MVP, we'll just return the schedules
    const upcomingIntakes = activeMedications.flatMap(med =>
      med.schedules.map(schedule => ({
        medication: med.name,
        time: schedule.time,
        dosage: med.dosage,
      }))
    );

    return {
      recentExams,
      upcomingAppointments,
      activeMedications: activeMedications.map(m => ({
        id: m.id,
        name: m.name,
        dosage: m.dosage,
        frequency: m.frequency,
        schedules: m.schedules,
      })),
      upcomingIntakes,
    };
  }

  async getExamTrends(patientId: string, examType?: string) {
    const where: any = { patientId };
    
    if (examType) {
      where.type = examType;
    }

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy: { date: 'asc' },
      select: {
        id: true,
        title: true,
        date: true,
        type: true,
        resultSummary: true,
      },
    });

    return exams;
  }

  async getMedicationAdherence(patientId: string, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    // Get all medication schedules for the patient
    const medications = await this.prisma.medication.findMany({
      where: { patientId },
      include: {
        schedules: {
          where: { active: true },
          include: {
            intakes: {
              where: {
                takenAt: { gte: since },
              },
            },
          },
        },
      },
    });

    // Calculate adherence statistics
    const stats = medications.map(med => {
      const totalScheduled = med.schedules.reduce((sum, schedule) => {
        // Simplified: assume one intake per day per schedule
        return sum + days;
      }, 0);

      const totalTaken = med.schedules.reduce((sum, schedule) => {
        return sum + schedule.intakes.filter(i => i.status === 'TAKEN').length;
      }, 0);

      const adherenceRate = totalScheduled > 0 ? (totalTaken / totalScheduled) * 100 : 0;

      return {
        medicationId: med.id,
        medicationName: med.name,
        totalScheduled,
        totalTaken,
        missed: totalScheduled - totalTaken,
        adherenceRate: Math.round(adherenceRate),
      };
    });

    return stats;
  }
}

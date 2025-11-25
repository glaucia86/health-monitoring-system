"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientOverview(patientId) {
        const recentExams = await this.prisma.exam.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
            take: 5,
        });
        const upcomingAppointments = await this.prisma.appointment.findMany({
            where: {
                patientId,
                date: { gte: new Date() },
            },
            orderBy: { date: 'asc' },
            take: 5,
        });
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
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(23, 59, 59, 999);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const upcomingIntakes = activeMedications.flatMap(med => med.schedules.map(schedule => ({
            medication: med.name,
            time: schedule.time,
            dosage: med.dosage,
        })));
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
    async getExamTrends(patientId, examType) {
        const where = { patientId };
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
    async getMedicationAdherence(patientId, days = 30) {
        const since = new Date();
        since.setDate(since.getDate() - days);
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
        const stats = medications.map(med => {
            const totalScheduled = med.schedules.reduce((sum, schedule) => {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
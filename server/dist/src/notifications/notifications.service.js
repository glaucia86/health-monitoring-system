"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const sgMail = __importStar(require("@sendgrid/mail"));
let NotificationsService = NotificationsService_1 = class NotificationsService {
    prisma;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
        const apiKey = process.env.SENDGRID_API_KEY;
        if (apiKey) {
            sgMail.setApiKey(apiKey);
        }
        else {
            this.logger.warn('SENDGRID_API_KEY not configured. Email notifications disabled.');
        }
    }
    async checkMedicationReminders() {
        this.logger.log('Checking medication reminders...');
        const now = new Date();
        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        const currentDay = now.getDay();
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
            if (!schedule.daysOfWeek.includes(currentDay)) {
                continue;
            }
            const [hours, minutes] = schedule.time.split(':').map(Number);
            const scheduleTime = new Date();
            scheduleTime.setHours(hours, minutes, 0, 0);
            if (scheduleTime >= now && scheduleTime <= nextHour) {
                await this.sendMedicationReminder(schedule);
            }
        }
    }
    async sendMedicationReminder(schedule) {
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
            }
            else {
                this.logger.log(`[DRY RUN] Would send reminder to ${patient.user.email} for ${medication.name}`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to send reminder to ${patient.user.email}:`, error);
        }
    }
    async sendTestReminder(patientId) {
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
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkMedicationReminders", null);
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map
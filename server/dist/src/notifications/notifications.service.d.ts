import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    checkMedicationReminders(): Promise<void>;
    private sendMedicationReminder;
    sendTestReminder(patientId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

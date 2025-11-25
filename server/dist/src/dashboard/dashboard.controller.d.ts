import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getOverview(req: any): Promise<{
        recentExams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            title: string;
            date: Date;
            type: string;
            resultSummary: string | null;
            fileUrl: string | null;
        }[];
        upcomingAppointments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            patientId: string;
            date: Date;
            doctorName: string;
            specialty: string | null;
            location: string | null;
        }[];
        activeMedications: {
            id: string;
            name: string;
            dosage: string;
            frequency: string;
            schedules: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                medicationId: string;
                time: string;
                daysOfWeek: number[];
                active: boolean;
            }[];
        }[];
        upcomingIntakes: {
            medication: string;
            time: string;
            dosage: string;
        }[];
    }>;
    getExamTrends(req: any, examType?: string): Promise<{
        id: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
    }[]>;
    getMedicationAdherence(req: any, days?: string): Promise<{
        medicationId: string;
        medicationName: string;
        totalScheduled: number;
        totalTaken: number;
        missed: number;
        adherenceRate: number;
    }[]>;
}

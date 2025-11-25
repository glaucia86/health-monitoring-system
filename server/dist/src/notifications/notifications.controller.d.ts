import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    sendTestReminder(patientId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

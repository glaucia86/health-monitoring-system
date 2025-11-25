export declare enum AuditAction {
    USER_REGISTERED = "USER_REGISTERED",
    USER_LOGIN = "USER_LOGIN",
    MEDICATION_CREATED = "MEDICATION_CREATED",
    MEDICATION_UPDATED = "MEDICATION_UPDATED",
    MEDICATION_DELETED = "MEDICATION_DELETED",
    MEDICATION_TAKEN = "MEDICATION_TAKEN",
    EXAM_CREATED = "EXAM_CREATED",
    EXAM_UPDATED = "EXAM_UPDATED",
    EXAM_DELETED = "EXAM_DELETED",
    APPOINTMENT_CREATED = "APPOINTMENT_CREATED",
    APPOINTMENT_UPDATED = "APPOINTMENT_UPDATED",
    APPOINTMENT_DELETED = "APPOINTMENT_DELETED",
    DOCUMENT_UPLOADED = "DOCUMENT_UPLOADED",
    DOCUMENT_DELETED = "DOCUMENT_DELETED",
    PATIENT_DATA_UPDATED = "PATIENT_DATA_UPDATED"
}
export interface AuditLogData {
    action: AuditAction;
    userId: string;
    patientId?: string;
    resourceId?: string;
    resourceType?: string;
    metadata?: any;
    ipAddress?: string;
    userAgent?: string;
}
export declare class AuditService {
    private readonly logger;
    log(data: AuditLogData): void;
    logUserRegistration(userId: string, email: string, ipAddress?: string): void;
    logUserLogin(userId: string, email: string, ipAddress?: string): void;
    logMedicationChange(action: AuditAction, userId: string, patientId: string, medicationId: string, changes?: any): void;
    logExamChange(action: AuditAction, userId: string, patientId: string, examId: string, changes?: any): void;
    logAppointmentChange(action: AuditAction, userId: string, patientId: string, appointmentId: string, changes?: any): void;
    logDocumentChange(action: AuditAction, userId: string, patientId: string, documentId: string, filename?: string): void;
    logPatientDataUpdate(userId: string, patientId: string, changes: any): void;
}

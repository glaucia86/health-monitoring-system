import { Injectable, Logger } from '@nestjs/common';

export enum AuditAction {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGIN = 'USER_LOGIN',
  MEDICATION_CREATED = 'MEDICATION_CREATED',
  MEDICATION_UPDATED = 'MEDICATION_UPDATED',
  MEDICATION_DELETED = 'MEDICATION_DELETED',
  MEDICATION_TAKEN = 'MEDICATION_TAKEN',
  EXAM_CREATED = 'EXAM_CREATED',
  EXAM_UPDATED = 'EXAM_UPDATED',
  EXAM_DELETED = 'EXAM_DELETED',
  APPOINTMENT_CREATED = 'APPOINTMENT_CREATED',
  APPOINTMENT_UPDATED = 'APPOINTMENT_UPDATED',
  APPOINTMENT_DELETED = 'APPOINTMENT_DELETED',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  DOCUMENT_DELETED = 'DOCUMENT_DELETED',
  PATIENT_DATA_UPDATED = 'PATIENT_DATA_UPDATED',
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

@Injectable()
export class AuditService {
  private readonly logger = new Logger('AUDIT');

  log(data: AuditLogData) {
    this.logger.log({
      timestamp: new Date().toISOString(),
      ...data,
      metadata: JSON.stringify(data.metadata),
    });
  }

  logUserRegistration(userId: string, email: string, ipAddress?: string) {
    this.log({
      action: AuditAction.USER_REGISTERED,
      userId,
      metadata: { email },
      ipAddress,
    });
  }

  logUserLogin(userId: string, email: string, ipAddress?: string) {
    this.log({
      action: AuditAction.USER_LOGIN,
      userId,
      metadata: { email },
      ipAddress,
    });
  }

  logMedicationChange(
    action: AuditAction,
    userId: string,
    patientId: string,
    medicationId: string,
    changes?: any,
  ) {
    this.log({
      action,
      userId,
      patientId,
      resourceId: medicationId,
      resourceType: 'Medication',
      metadata: changes,
    });
  }

  logExamChange(
    action: AuditAction,
    userId: string,
    patientId: string,
    examId: string,
    changes?: any,
  ) {
    this.log({
      action,
      userId,
      patientId,
      resourceId: examId,
      resourceType: 'Exam',
      metadata: changes,
    });
  }

  logAppointmentChange(
    action: AuditAction,
    userId: string,
    patientId: string,
    appointmentId: string,
    changes?: any,
  ) {
    this.log({
      action,
      userId,
      patientId,
      resourceId: appointmentId,
      resourceType: 'Appointment',
      metadata: changes,
    });
  }

  logDocumentChange(
    action: AuditAction,
    userId: string,
    patientId: string,
    documentId: string,
    filename?: string,
  ) {
    this.log({
      action,
      userId,
      patientId,
      resourceId: documentId,
      resourceType: 'Document',
      metadata: { filename },
    });
  }

  logPatientDataUpdate(
    userId: string,
    patientId: string,
    changes: any,
  ) {
    this.log({
      action: AuditAction.PATIENT_DATA_UPDATED,
      userId,
      patientId,
      resourceType: 'Patient',
      metadata: changes,
    });
  }
}

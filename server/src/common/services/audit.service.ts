import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export enum AuditAction {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGIN = 'USER_LOGIN',
  USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED',
  USER_AVATAR_UPDATED = 'USER_AVATAR_UPDATED',
  USER_DELETED = 'USER_DELETED',
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

  constructor(private prisma: PrismaService) {}

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

  logProfileUpdate(userId: string, changes: any, oldValues?: any, ipAddress?: string) {
    this.log({
      action: AuditAction.USER_PROFILE_UPDATED,
      userId,
      resourceId: userId,
      resourceType: 'User',
      metadata: changes,
      ipAddress,
    });

    // Save profile changes to database for history tracking
    this.saveProfileChanges(userId, changes, oldValues, ipAddress);
  }

  /**
   * Saves individual field changes to ProfileAuditLog table
   */
  private async saveProfileChanges(
    userId: string,
    changes: any,
    oldValues?: any,
    ipAddress?: string,
  ) {
    try {
      if (!oldValues) return;

      // Map of field changes
      const fieldMappings = {
        name: { label: 'Nome', oldValue: oldValues.name, newValue: changes.name },
        phone: { label: 'Telefone', oldValue: oldValues.phone, newValue: changes.phone },
        address: { label: 'Endereço', oldValue: oldValues.address, newValue: changes.address },
        emergencyContact: { 
          label: 'Contato de Emergência', 
          oldValue: oldValues.emergencyContact, 
          newValue: changes.emergencyContact 
        },
        emergencyPhone: { 
          label: 'Telefone de Emergência', 
          oldValue: oldValues.emergencyPhone, 
          newValue: changes.emergencyPhone 
        },
      };

      // Create audit log entries for each changed field
      const auditEntries = [];
      
      for (const [field, mapping] of Object.entries(fieldMappings)) {
        if (changes[field] !== undefined && changes[field] !== mapping.oldValue) {
          auditEntries.push({
            userId,
            action: 'update',
            fieldName: mapping.label,
            oldValue: mapping.oldValue || null,
            newValue: changes[field] || null,
            ipAddress,
          });
        }
      }

      // Bulk insert audit logs
      if (auditEntries.length > 0) {
        await this.prisma.profileAuditLog.createMany({
          data: auditEntries,
        });
      }
    } catch (error) {
      this.logger.error('Failed to save profile audit logs:', error);
    }
  }

  logAvatarUpdate(
    userId: string,
    action: 'upload' | 'remove',
    filename?: string,
    ipAddress?: string,
  ) {
    this.log({
      action: AuditAction.USER_AVATAR_UPDATED,
      userId,
      resourceId: userId,
      resourceType: 'User',
      metadata: { action, filename },
      ipAddress,
    });

    // Save avatar change to database
    this.saveAvatarChange(userId, action, filename, ipAddress);
  }

  /**
   * Saves avatar changes to ProfileAuditLog table
   */
  private async saveAvatarChange(
    userId: string,
    action: 'upload' | 'remove',
    filename?: string,
    ipAddress?: string,
  ) {
    try {
      await this.prisma.profileAuditLog.create({
        data: {
          userId,
          action: action === 'upload' ? 'avatar_upload' : 'avatar_remove',
          fieldName: 'Foto de Perfil',
          oldValue: action === 'upload' ? 'Sem foto' : filename || 'Foto anterior',
          newValue: action === 'upload' ? filename || 'Nova foto' : null,
          ipAddress,
        },
      });
    } catch (error) {
      this.logger.error('Failed to save avatar audit log:', error);
    }
  }

  logUserDeletion(userId: string, ipAddress?: string) {
    this.log({
      action: AuditAction.USER_DELETED,
      userId,
      resourceId: userId,
      resourceType: 'User',
      ipAddress,
    });
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = exports.AuditAction = void 0;
const common_1 = require("@nestjs/common");
var AuditAction;
(function (AuditAction) {
    AuditAction["USER_REGISTERED"] = "USER_REGISTERED";
    AuditAction["USER_LOGIN"] = "USER_LOGIN";
    AuditAction["MEDICATION_CREATED"] = "MEDICATION_CREATED";
    AuditAction["MEDICATION_UPDATED"] = "MEDICATION_UPDATED";
    AuditAction["MEDICATION_DELETED"] = "MEDICATION_DELETED";
    AuditAction["MEDICATION_TAKEN"] = "MEDICATION_TAKEN";
    AuditAction["EXAM_CREATED"] = "EXAM_CREATED";
    AuditAction["EXAM_UPDATED"] = "EXAM_UPDATED";
    AuditAction["EXAM_DELETED"] = "EXAM_DELETED";
    AuditAction["APPOINTMENT_CREATED"] = "APPOINTMENT_CREATED";
    AuditAction["APPOINTMENT_UPDATED"] = "APPOINTMENT_UPDATED";
    AuditAction["APPOINTMENT_DELETED"] = "APPOINTMENT_DELETED";
    AuditAction["DOCUMENT_UPLOADED"] = "DOCUMENT_UPLOADED";
    AuditAction["DOCUMENT_DELETED"] = "DOCUMENT_DELETED";
    AuditAction["PATIENT_DATA_UPDATED"] = "PATIENT_DATA_UPDATED";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
let AuditService = class AuditService {
    logger = new common_1.Logger('AUDIT');
    log(data) {
        this.logger.log({
            timestamp: new Date().toISOString(),
            ...data,
            metadata: JSON.stringify(data.metadata),
        });
    }
    logUserRegistration(userId, email, ipAddress) {
        this.log({
            action: AuditAction.USER_REGISTERED,
            userId,
            metadata: { email },
            ipAddress,
        });
    }
    logUserLogin(userId, email, ipAddress) {
        this.log({
            action: AuditAction.USER_LOGIN,
            userId,
            metadata: { email },
            ipAddress,
        });
    }
    logMedicationChange(action, userId, patientId, medicationId, changes) {
        this.log({
            action,
            userId,
            patientId,
            resourceId: medicationId,
            resourceType: 'Medication',
            metadata: changes,
        });
    }
    logExamChange(action, userId, patientId, examId, changes) {
        this.log({
            action,
            userId,
            patientId,
            resourceId: examId,
            resourceType: 'Exam',
            metadata: changes,
        });
    }
    logAppointmentChange(action, userId, patientId, appointmentId, changes) {
        this.log({
            action,
            userId,
            patientId,
            resourceId: appointmentId,
            resourceType: 'Appointment',
            metadata: changes,
        });
    }
    logDocumentChange(action, userId, patientId, documentId, filename) {
        this.log({
            action,
            userId,
            patientId,
            resourceId: documentId,
            resourceType: 'Document',
            metadata: { filename },
        });
    }
    logPatientDataUpdate(userId, patientId, changes) {
        this.log({
            action: AuditAction.PATIENT_DATA_UPDATED,
            userId,
            patientId,
            resourceType: 'Patient',
            metadata: changes,
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)()
], AuditService);
//# sourceMappingURL=audit.service.js.map
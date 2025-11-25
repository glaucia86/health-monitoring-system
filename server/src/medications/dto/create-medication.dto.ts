export class CreateMedicationDto {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string; // ISO Date
  endDate?: string; // ISO Date
  notes?: string;
  patientId: string;
}

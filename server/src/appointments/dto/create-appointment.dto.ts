export class CreateAppointmentDto {
  date: string; // ISO Date
  doctorName: string;
  specialty: string;
  notes?: string;
  patientId: string;
}

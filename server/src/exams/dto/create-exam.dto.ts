export class CreateExamDto {
  title: string;
  date: string; // ISO Date
  type: string;
  resultSummary?: string;
  fileUrl?: string;
  patientId: string;
}

export class CreateDocumentDto {
  filename: string;
  url: string;
  type: string;
  tags?: string[];
  patientId: string;
}

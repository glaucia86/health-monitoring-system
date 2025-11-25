export class CreatePatientDto {
  name: string;
  birthDate: string; // ISO Date string
  diagnosis?: string;
  userId: string;
}

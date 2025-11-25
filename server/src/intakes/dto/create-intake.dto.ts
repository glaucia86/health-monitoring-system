export class CreateIntakeDto {
  scheduleId: string;
  takenAt: string; // ISO Date
  status: string; // TAKEN, MISSED, LATE
  notes?: string;
}

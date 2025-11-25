export class CreateScheduleDto {
  medicationId: string;
  time: string; // HH:mm
  daysOfWeek?: number[]; // 0-6
  active: boolean;
}

import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.medicationSchedule.create({
      data: {
        medicationId: createScheduleDto.medicationId,
        time: createScheduleDto.time,
        daysOfWeek: createScheduleDto.daysOfWeek,
        active: createScheduleDto.active,
      },
    });
  }

  findAll() {
    return this.prisma.medicationSchedule.findMany();
  }

  findOne(id: string) {
    return this.prisma.medicationSchedule.findUnique({ where: { id } });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.medicationSchedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  remove(id: string) {
    return this.prisma.medicationSchedule.delete({ where: { id } });
  }
}

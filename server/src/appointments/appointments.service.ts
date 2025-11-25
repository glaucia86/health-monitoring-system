import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        date: new Date(createAppointmentDto.date),
        doctorName: createAppointmentDto.doctorName,
        specialty: createAppointmentDto.specialty,
        notes: createAppointmentDto.notes,
        patientId: createAppointmentDto.patientId,
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany();
  }

  findOne(id: string) {
    return this.prisma.appointment.findUnique({ where: { id } });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...updateAppointmentDto,
        date: updateAppointmentDto.date ? new Date(updateAppointmentDto.date) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}

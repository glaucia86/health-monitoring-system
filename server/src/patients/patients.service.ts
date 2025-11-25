import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: {
        name: createPatientDto.name,
        birthDate: new Date(createPatientDto.birthDate),
        diagnosis: createPatientDto.diagnosis,
        userId: createPatientDto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  findOne(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { medications: true, exams: true, appointments: true },
    });
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...updatePatientDto,
        birthDate: updatePatientDto.birthDate ? new Date(updatePatientDto.birthDate) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}

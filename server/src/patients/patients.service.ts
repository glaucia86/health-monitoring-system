import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) { }

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

  findAll(userId: string) {
    return this.prisma.patient.findMany({
      where: { userId },
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.patient.findFirst({
      where: { id, userId },
      include: { medications: true, exams: true, appointments: true },
    });
  }

  update(id: string, userId: string, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.updateMany({
      where: { id, userId },
      data: {
        ...updatePatientDto,
        birthDate: updatePatientDto.birthDate ? new Date(updatePatientDto.birthDate) : undefined,
      },
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.patient.deleteMany({
      where: { id, userId },
    });
  }
}

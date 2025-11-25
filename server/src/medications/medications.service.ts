import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicationsService {
  constructor(private prisma: PrismaService) {}

  create(createMedicationDto: CreateMedicationDto) {
    return this.prisma.medication.create({
      data: {
        name: createMedicationDto.name,
        dosage: createMedicationDto.dosage,
        frequency: createMedicationDto.frequency,
        startDate: new Date(createMedicationDto.startDate),
        endDate: createMedicationDto.endDate ? new Date(createMedicationDto.endDate) : null,
        notes: createMedicationDto.notes,
        patientId: createMedicationDto.patientId,
      },
    });
  }

  findAll() {
    return this.prisma.medication.findMany();
  }

  findOne(id: string) {
    return this.prisma.medication.findUnique({
      where: { id },
    });
  }

  update(id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.prisma.medication.update({
      where: { id },
      data: {
        ...updateMedicationDto,
        startDate: updateMedicationDto.startDate ? new Date(updateMedicationDto.startDate) : undefined,
        endDate: updateMedicationDto.endDate ? new Date(updateMedicationDto.endDate) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.medication.delete({
      where: { id },
    });
  }
}

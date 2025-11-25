import { Injectable } from '@nestjs/common';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntakesService {
  constructor(private prisma: PrismaService) {}

  create(createIntakeDto: CreateIntakeDto) {
    return this.prisma.medicationIntake.create({
      data: {
        scheduleId: createIntakeDto.scheduleId,
        takenAt: new Date(createIntakeDto.takenAt),
        status: createIntakeDto.status,
        notes: createIntakeDto.notes,
      },
    });
  }

  findAll() {
    return this.prisma.medicationIntake.findMany();
  }

  findOne(id: string) {
    return this.prisma.medicationIntake.findUnique({ where: { id } });
  }

  update(id: string, updateIntakeDto: UpdateIntakeDto) {
    return this.prisma.medicationIntake.update({
      where: { id },
      data: {
        ...updateIntakeDto,
        takenAt: updateIntakeDto.takenAt ? new Date(updateIntakeDto.takenAt) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.medicationIntake.delete({ where: { id } });
  }
}

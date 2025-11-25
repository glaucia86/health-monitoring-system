import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  create(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        title: createExamDto.title,
        date: new Date(createExamDto.date),
        type: createExamDto.type,
        resultSummary: createExamDto.resultSummary,
        fileUrl: createExamDto.fileUrl,
        patientId: createExamDto.patientId,
      },
    });
  }

  findAll() {
    return this.prisma.exam.findMany();
  }

  findOne(id: string) {
    return this.prisma.exam.findUnique({ where: { id } });
  }

  update(id: string, updateExamDto: UpdateExamDto) {
    return this.prisma.exam.update({
      where: { id },
      data: {
        ...updateExamDto,
        date: updateExamDto.date ? new Date(updateExamDto.date) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}

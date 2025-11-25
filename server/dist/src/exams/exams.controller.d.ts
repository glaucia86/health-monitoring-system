import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(createExamDto: CreateExamDto): import("@prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
        fileUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
        fileUrl: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
        fileUrl: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateExamDto: UpdateExamDto): import("@prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
        fileUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ExamClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        title: string;
        date: Date;
        type: string;
        resultSummary: string | null;
        fileUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

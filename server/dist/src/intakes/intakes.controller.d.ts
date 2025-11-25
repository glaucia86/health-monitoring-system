import { IntakesService } from './intakes.service';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
export declare class IntakesController {
    private readonly intakesService;
    constructor(intakesService: IntakesService);
    create(createIntakeDto: CreateIntakeDto): import("@prisma/client").Prisma.Prisma__MedicationIntakeClient<{
        id: string;
        notes: string | null;
        scheduleId: string;
        takenAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        notes: string | null;
        scheduleId: string;
        takenAt: Date;
        status: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__MedicationIntakeClient<{
        id: string;
        notes: string | null;
        scheduleId: string;
        takenAt: Date;
        status: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateIntakeDto: UpdateIntakeDto): import("@prisma/client").Prisma.Prisma__MedicationIntakeClient<{
        id: string;
        notes: string | null;
        scheduleId: string;
        takenAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__MedicationIntakeClient<{
        id: string;
        notes: string | null;
        scheduleId: string;
        takenAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

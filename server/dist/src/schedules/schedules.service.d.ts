import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class SchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleDto: CreateScheduleDto): import("@prisma/client").Prisma.Prisma__MedicationScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicationId: string;
        time: string;
        daysOfWeek: number[];
        active: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicationId: string;
        time: string;
        daysOfWeek: number[];
        active: boolean;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__MedicationScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicationId: string;
        time: string;
        daysOfWeek: number[];
        active: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): import("@prisma/client").Prisma.Prisma__MedicationScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicationId: string;
        time: string;
        daysOfWeek: number[];
        active: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__MedicationScheduleClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        medicationId: string;
        time: string;
        daysOfWeek: number[];
        active: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAppointmentDto: CreateAppointmentDto): import("@prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        date: Date;
        doctorName: string;
        specialty: string | null;
        location: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        date: Date;
        doctorName: string;
        specialty: string | null;
        location: string | null;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        date: Date;
        doctorName: string;
        specialty: string | null;
        location: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): import("@prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        date: Date;
        doctorName: string;
        specialty: string | null;
        location: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        date: Date;
        doctorName: string;
        specialty: string | null;
        location: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

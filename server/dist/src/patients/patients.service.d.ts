import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto): import("@prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        birthDate: Date;
        diagnosis: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        birthDate: Date;
        diagnosis: string | null;
        userId: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PatientClient<({
        medications: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dosage: string;
            frequency: string;
            startDate: Date;
            endDate: Date | null;
            notes: string | null;
            patientId: string;
        }[];
        exams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            title: string;
            date: Date;
            type: string;
            resultSummary: string | null;
            fileUrl: string | null;
        }[];
        appointments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            patientId: string;
            date: Date;
            doctorName: string;
            specialty: string | null;
            location: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        birthDate: Date;
        diagnosis: string | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePatientDto: UpdatePatientDto): import("@prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        birthDate: Date;
        diagnosis: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        birthDate: Date;
        diagnosis: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

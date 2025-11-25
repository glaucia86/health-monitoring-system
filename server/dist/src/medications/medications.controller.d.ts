import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    create(createMedicationDto: CreateMedicationDto): import("@prisma/client").Prisma.Prisma__MedicationClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__MedicationClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateMedicationDto: UpdateMedicationDto): import("@prisma/client").Prisma.Prisma__MedicationClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__MedicationClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}

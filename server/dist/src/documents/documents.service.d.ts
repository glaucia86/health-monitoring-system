import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';
export declare class DocumentsService {
    private prisma;
    private auditService;
    private blobServiceClient;
    private containerName;
    constructor(prisma: PrismaService, auditService: AuditService);
    private ensureContainer;
    uploadDocument(file: Express.Multer.File, patientId: string, userId: string, tags?: string[], metadata?: any): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        type: string;
        filename: string;
        tags: string[];
        content: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    getDocument(id: string, patientId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        type: string;
        filename: string;
        tags: string[];
        content: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    listDocuments(patientId: string): Promise<{
        url: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        type: string;
        filename: string;
        tags: string[];
        content: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    deleteDocument(id: string, patientId: string, userId: string): Promise<{
        message: string;
    }>;
}

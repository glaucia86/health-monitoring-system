import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    uploadDocument(file: Express.Multer.File, tags: string, metadata: string, req: any): Promise<{
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
    listDocuments(req: any): Promise<{
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
    getDocument(id: string, req: any): Promise<{
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
    deleteDocument(id: string, req: any): Promise<{
        message: string;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prisma;
    private readonly logger;
    private chatModel;
    constructor(prisma: PrismaService);
    chat(patientId: string, message: string, conversationId?: string): Promise<{
        response: string;
        conversationId: string;
        sources: {
            documentId: string;
            filename: string;
            relevantContent: string;
        }[];
    }>;
}

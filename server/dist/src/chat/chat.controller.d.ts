import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendMessage(req: any, dto: ChatMessageDto): Promise<{
        response: string;
        conversationId: string;
        sources: {
            documentId: string;
            filename: string;
            relevantContent: string;
        }[];
    }>;
}

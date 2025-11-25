export declare class ChatMessageDto {
    message: string;
    conversationId?: string;
}
export declare class ChatResponseDto {
    response: string;
    conversationId: string;
    sources?: Array<{
        documentId: string;
        filename: string;
        relevantContent: string;
    }>;
}

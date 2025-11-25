import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  conversationId?: string;
}

export class ChatResponseDto {
  response: string;
  conversationId: string;
  sources?: Array<{
    documentId: string;
    filename: string;
    relevantContent: string;
  }>;
}

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatMessageDto } from './dto/chat-message.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Enviar mensagem para o chat de IA' })
  @ApiBody({ type: ChatMessageDto })
  @ApiResponse({ status: 200, description: 'Resposta do chat' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async sendMessage(@Request() req: any, @Body() dto: ChatMessageDto) {
    const patientId = req.user.patientId;
    if (!patientId) {
      throw new Error('User is not associated with a patient');
    }

    return this.chatService.chat(patientId, dto.message, dto.conversationId);
  }
}

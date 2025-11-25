import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Documentos')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Fazer upload de documento' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        tags: { type: 'string', description: 'Array de tags em JSON' },
        metadata: { type: 'string', description: 'Metadados em JSON' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Documento enviado com sucesso' })
  @ApiResponse({ status: 400, description: 'Arquivo inválido' })
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body('tags') tags: string,
    @Body('metadata') metadata: string,
    @Request() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const patientId = req.user.patientId;
    const userId = req.user.userId;
    const tagsArray = tags ? JSON.parse(tags) : [];
    const metadataObj = metadata ? JSON.parse(metadata) : {};

    return this.documentsService.uploadDocument(file, patientId, userId, tagsArray, metadataObj);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os documentos do paciente' })
  @ApiResponse({ status: 200, description: 'Lista de documentos' })
  listDocuments(@Request() req: any) {
    const patientId = req.user.patientId;
    return this.documentsService.listDocuments(patientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter documento por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do documento' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  getDocument(@Param('id') id: string, @Request() req: any) {
    const patientId = req.user.patientId;
    return this.documentsService.getDocument(id, patientId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar documento' })
  @ApiResponse({ status: 200, description: 'Documento deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  deleteDocument(@Param('id') id: string, @Request() req: any) {
    const patientId = req.user.patientId;
    const userId = req.user.userId;
    return this.documentsService.deleteDocument(id, patientId, userId);
  }
}

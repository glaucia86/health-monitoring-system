import { Injectable, NotFoundException } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService, AuditAction } from '../common/services/audit.service';
import * as crypto from 'crypto';

@Injectable()
export class DocumentsService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    this.containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'documents';

    if (!connectionString) {
      console.warn('Azure Storage connection string not configured. File uploads will be disabled.');
    } else {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      this.ensureContainer();
    }
  }

  private async ensureContainer() {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    await containerClient.createIfNotExists({ access: 'blob' });
  }

  async uploadDocument(
    file: Express.Multer.File,
    patientId: string,
    userId: string,
    tags: string[] = [],
    metadata?: any,
  ) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Storage not configured. Cannot upload files.');
    }

    // Generate unique blob name
    const fileExt = file.originalname.split('.').pop();
    const blobName = `${crypto.randomUUID()}.${fileExt}`;

    // Upload to Azure Blob Storage
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });

    const url = blockBlobClient.url;

    // Save document metadata to database
    const document = await this.prisma.document.create({
      data: {
        filename: file.originalname,
        url,
        type: file.mimetype,
        tags,
        metadata: metadata || {},
        patientId,
      },
    });

    // Audit log
    this.auditService.logDocumentChange(
      AuditAction.DOCUMENT_UPLOADED,
      userId,
      patientId,
      document.id,
      file.originalname,
    );

    return document;
  }

  async getDocument(id: string, patientId: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        id,
        patientId,
      },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async listDocuments(patientId: string) {
    return this.prisma.document.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteDocument(id: string, patientId: string, userId: string) {
    const document = await this.getDocument(id, patientId);

    // Delete from Azure Blob Storage
    if (this.blobServiceClient) {
      try {
        const blobName = document.url.split('/').pop();
        if (blobName) {
          const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);
          await blockBlobClient.deleteIfExists();
        }
      } catch (error) {
        console.error('Failed to delete blob:', error);
      }
    }

    // Delete from database
    await this.prisma.document.delete({
      where: { id },
    });

    // Audit log
    this.auditService.logDocumentChange(
      AuditAction.DOCUMENT_DELETED,
      userId,
      patientId,
      id,
      document.filename,
    );

    return { message: 'Document deleted successfully' };
  }
}

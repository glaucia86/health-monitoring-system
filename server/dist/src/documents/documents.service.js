"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const storage_blob_1 = require("@azure/storage-blob");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../common/services/audit.service");
const crypto = __importStar(require("crypto"));
let DocumentsService = class DocumentsService {
    prisma;
    auditService;
    blobServiceClient;
    containerName;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        this.containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'documents';
        if (!connectionString) {
            console.warn('Azure Storage connection string not configured. File uploads will be disabled.');
        }
        else {
            this.blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
            this.ensureContainer();
        }
    }
    async ensureContainer() {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        await containerClient.createIfNotExists({ access: 'blob' });
    }
    async uploadDocument(file, patientId, userId, tags = [], metadata) {
        if (!this.blobServiceClient) {
            throw new Error('Azure Storage not configured. Cannot upload files.');
        }
        const fileExt = file.originalname.split('.').pop();
        const blobName = `${crypto.randomUUID()}.${fileExt}`;
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype,
            },
        });
        const url = blockBlobClient.url;
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
        this.auditService.logDocumentChange(audit_service_1.AuditAction.DOCUMENT_UPLOADED, userId, patientId, document.id, file.originalname);
        return document;
    }
    async getDocument(id, patientId) {
        const document = await this.prisma.document.findFirst({
            where: {
                id,
                patientId,
            },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        return document;
    }
    async listDocuments(patientId) {
        return this.prisma.document.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async deleteDocument(id, patientId, userId) {
        const document = await this.getDocument(id, patientId);
        if (this.blobServiceClient) {
            try {
                const blobName = document.url.split('/').pop();
                if (blobName) {
                    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
                    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    await blockBlobClient.deleteIfExists();
                }
            }
            catch (error) {
                console.error('Failed to delete blob:', error);
            }
        }
        await this.prisma.document.delete({
            where: { id },
        });
        this.auditService.logDocumentChange(audit_service_1.AuditAction.DOCUMENT_DELETED, userId, patientId, id, document.filename);
        return { message: 'Document deleted successfully' };
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map
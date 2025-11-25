"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
let ChatService = ChatService_1 = class ChatService {
    prisma;
    logger = new common_1.Logger(ChatService_1.name);
    chatModel;
    constructor(prisma) {
        this.prisma = prisma;
        const apiKey = process.env.OPENAI_API_KEY;
        const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
        if (!apiKey) {
            this.logger.warn('OPENAI_API_KEY not configured. AI chat will be disabled.');
        }
        else {
            this.chatModel = new openai_1.ChatOpenAI({
                apiKey,
                model,
                temperature: 0.7,
            });
        }
    }
    async chat(patientId, message, conversationId) {
        if (!this.chatModel) {
            return {
                response: 'AI chat is not configured. Please set OPENAI_API_KEY.',
                conversationId: conversationId || 'disabled',
                sources: [],
            };
        }
        const patient = await this.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                exams: {
                    orderBy: { date: 'desc' },
                    take: 5,
                },
                medications: {
                    where: {
                        OR: [
                            { endDate: null },
                            { endDate: { gte: new Date() } },
                        ],
                    },
                },
                appointments: {
                    where: {
                        date: { gte: new Date() },
                    },
                    orderBy: { date: 'asc' },
                    take: 3,
                },
            },
        });
        if (!patient) {
            throw new Error('Patient not found');
        }
        const documents = await this.prisma.document.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: {
                id: true,
                filename: true,
                content: true,
                tags: true,
            },
        });
        const contextParts = [
            `Paciente: ${patient.name}`,
        ];
        if (patient.exams.length > 0) {
            contextParts.push('\nExames recentes:');
            patient.exams.forEach(exam => {
                contextParts.push(`- ${exam.title} (${exam.date.toLocaleDateString()}): ${exam.resultSummary || 'Sem resumo'}`);
            });
        }
        if (patient.medications.length > 0) {
            contextParts.push('\nMedicações atuais:');
            patient.medications.forEach(med => {
                contextParts.push(`- ${med.name} ${med.dosage} (${med.frequency})`);
            });
        }
        if (patient.appointments.length > 0) {
            contextParts.push('\nConsultas próximas:');
            patient.appointments.forEach(apt => {
                contextParts.push(`- ${apt.doctorName} (${apt.specialty || 'Especialidade não informada'}) em ${apt.date.toLocaleDateString()}`);
            });
        }
        if (documents.length > 0) {
            contextParts.push('\nDocumentos disponíveis:');
            documents.forEach(doc => {
                contextParts.push(`- ${doc.filename}${doc.tags.length > 0 ? ` [${doc.tags.join(', ')}]` : ''}`);
            });
        }
        const context = contextParts.filter(Boolean).join('\n');
        const systemPrompt = `Você é um assistente virtual especializado em saúde para pacientes com câncer de mama avançado.

IMPORTANTE - Diretrizes de Segurança:
1. Você NÃO é um médico e NÃO deve fazer diagnósticos
2. Você NÃO deve recomendar mudanças em medicações ou tratamentos
3. Você DEVE sempre orientar o paciente a consultar seu médico para decisões médicas
4. Você pode explicar termos médicos, procedimentos e ajudar o paciente a entender seus dados de saúde
5. Você pode ajudar com lembretes de medicação, organização de consultas e entendimento de exames
6. Use linguagem clara, empática e acessível
7. Em caso de emergência, oriente a procurar atendimento médico imediato

Contexto do Paciente:
{context}

Mensagem do Paciente: {message}

Responda de forma clara, empática e sempre priorizando a segurança do paciente.`;
        const prompt = prompts_1.ChatPromptTemplate.fromTemplate(systemPrompt);
        const chain = prompt.pipe(this.chatModel).pipe(new output_parsers_1.StringOutputParser());
        const response = await chain.invoke({
            context,
            message,
        });
        const finalConversationId = conversationId || `conv_${Date.now()}_${patientId}`;
        return {
            response,
            conversationId: finalConversationId,
            sources: documents.map(doc => ({
                documentId: doc.id,
                filename: doc.filename,
                relevantContent: doc.content?.substring(0, 200) || '',
            })),
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private chatModel: ChatOpenAI;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY not configured. AI chat will be disabled.');
    } else {
      this.chatModel = new ChatOpenAI({
        apiKey,
        model,
        temperature: 0.7,
      });
    }
  }

  async chat(patientId: string, message: string, conversationId?: string) {
    if (!this.chatModel) {
      return {
        response: 'AI chat is not configured. Please set OPENAI_API_KEY.',
        conversationId: conversationId || 'disabled',
        sources: [],
      };
    }

    // Get patient context (recent exams, medications, appointments)
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

    // Get relevant documents (simplified - in production, use RAG with embeddings)
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

    // Build context string
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

    // System prompt with safety guidelines
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

    const prompt = ChatPromptTemplate.fromTemplate(systemPrompt);

    // Create chain
    const chain = prompt.pipe(this.chatModel).pipe(new StringOutputParser());

    // Generate response
    const response = await chain.invoke({
      context,
      message,
    });

    // Generate or use conversation ID
    const finalConversationId = conversationId || `conv_${Date.now()}_${patientId}`;

    // In a production app, you would save the conversation history to the database
    // For MVP, we'll just return the response

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
}

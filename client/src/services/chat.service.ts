import api from '@/lib/axios';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types';

export interface DocumentListItem {
  id: string;
  filename: string;
  url: string;
  type: string;
  size?: number;
  tags: string[];
  content?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export const chatService = {
  async sendMessage(data: ChatRequest): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>('/chat/message', data);
    return response.data;
  },

  async getConversation(conversationId: string): Promise<ChatMessage[]> {
    const response = await api.get<ChatMessage[]>(`/chat/conversation/${conversationId}`);
    return response.data;
  },

  async uploadDocument(file: File): Promise<{ url: string; documentId: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Backend returns 'id', map it to 'documentId' for frontend
    return {
      url: response.data.url,
      documentId: response.data.id,
    };
  },

  async getDocuments(): Promise<DocumentListItem[]> {
    const response = await api.get<DocumentListItem[]>('/documents');
    return response.data;
  },

  async deleteDocument(id: string): Promise<void> {
    await api.delete(`/documents/${id}`);
  },
};

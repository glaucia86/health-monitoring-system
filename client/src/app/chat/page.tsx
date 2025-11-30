'use client';

import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { m, AnimatePresence } from '@/lib/motion-provider';
import { useAuthStore } from '@/stores/auth.store';
import { chatService, DocumentListItem } from '@/services/chat.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/types';
import { toast } from 'sonner';
import { MessageSquare, Upload, FileText, Lightbulb, Info, Copy, Check } from 'lucide-react';
import { truncateId } from '@/lib/utils';

// Layout & Motion
import { MainLayout } from '@/components/layout/main-layout';
import { PageHeader } from '@/components/shared/page-header';
import { fadeIn, scaleIn, staggerContainer, listItem } from '@/lib/motion';

// Chat components
import { 
  MessageBubble, 
  TypingIndicator, 
  ChatInput, 
  DocumentList,
  Document 
} from '@/components/chat';

export default function ChatPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Altura fixa grande para área de chat (padrão AI)

  // Handle copy conversation ID to clipboard
  const handleCopyId = async () => {
    if (!conversationId) return;
    try {
      await navigator.clipboard.writeText(conversationId);
      setCopiedId(true);
      toast.success('ID copiado!');
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      toast.error('Erro ao copiar ID');
    }
  };

  // Fetch documents
  const {
    data: documentsData,
    error: documentsError,
    isLoading: isLoadingDocuments,
  } = useQuery<DocumentListItem[]>({
    queryKey: ['documents'],
    queryFn: chatService.getDocuments,
    retry: false,
  });

  const documents = (documentsData as DocumentListItem[] | undefined) ?? [];

  useEffect(() => {
    if (!documentsError) return;
    const error = documentsError as Error & { response?: { data?: { message?: string } } };
    toast.error('Não foi possível carregar seus documentos', {
      description:
        error.response?.data?.message ||
        'Associe sua conta a um paciente antes de usar esta funcionalidade.',
    });
  }, [documentsError]);

  // Transform documents to match DocumentList component interface
  const transformedDocuments: Document[] = documents.map((doc: DocumentListItem) => ({
    id: doc.id,
    name: doc.filename,
    type: doc.type || 'application/octet-stream',
    size: doc.size || 0,
    uploadedAt: new Date(doc.createdAt),
    status: 'ready' as const,
  }));

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: chatService.uploadDocument,
    onSuccess: () => {
      toast.success('Documento enviado com sucesso!', {
        description: `O arquivo foi processado e está pronto para análise.`,
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Refetch documents list
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error('Erro ao enviar documento', {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: chatService.sendMessage,
    onSuccess: (data, variables) => {
      // Add user message using variables to avoid stale closure
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: 'user',
        content: variables.message,
        createdAt: new Date(),
      };

      // Add assistant message from response
      const assistantMessage: ChatMessage = {
        id: data.message.id,
        role: 'assistant',
        content: data.message.content,
        createdAt: new Date(data.message.createdAt),
      };
      
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setConversationId(data.conversationId);
      setInput('');
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error('Erro ao enviar mensagem', {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessageMutation.mutate({
      message: input,
      conversationId,
    });
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadDocument = () => {
    if (selectedFile) {
      toast.promise(
        uploadMutation.mutateAsync(selectedFile),
        {
          loading: 'Enviando documento...',
          success: 'Documento enviado com sucesso! Pronto para análise.',
          error: (err) => `Erro ao enviar: ${err.response?.data?.message || err.message}`,
        }
      );
    }
  };

  return (
    <MainLayout>
      <m.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="h-[calc(100vh-64px)] flex flex-col gap-2"
      >
        {/* Page Header - compacto */}
        <div className="flex-shrink-0">
          <PageHeader
            title="Chat com IA"
            icon={MessageSquare}
          />
        </div>

        {/* Main Content - altura máxima */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Chat Area */}
          <m.div 
            className="lg:col-span-2 h-full min-h-0"
            variants={scaleIn}
          >
            <Card className="h-full flex flex-col border-border/50 shadow-sm">
              <CardHeader className="flex-shrink-0 border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Conversa
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={scrollRef}>
                  {messages.length === 0 ? (
                    <m.div 
                      className="flex items-center justify-center h-full"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="text-center max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-lg font-medium text-foreground mb-2">
                          Olá, {user?.name}! 👋
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Faça uma pergunta sobre saúde ou envie documentos médicos para análise.
                        </p>
                      </div>
                    </m.div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <m.div 
                          key={message.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <MessageBubble
                            role={message.role}
                            content={message.content}
                            timestamp={message.createdAt}
                            avatar={{
                              fallback: message.role === 'assistant' 
                                ? 'IA' 
                                : user?.name?.charAt(0).toUpperCase() || 'U',
                            }}
                          />
                        </m.div>
                      ))}
                      
                      {/* Typing Indicator */}
                      <TypingIndicator visible={sendMessageMutation.isPending} />
                    </div>
                  )}
                </div>

                {/* Chat Input - rodapé fixo */}
                <div className="flex-shrink-0 border-t bg-background p-4">
                  <ChatInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSendMessage}
                    onAttach={handleAttachClick}
                    placeholder="Digite sua mensagem... (Shift+Enter para nova linha)"
                    disabled={sendMessageMutation.isPending}
                    loading={sendMessageMutation.isPending}
                  />
                  {/* Hidden file input for attachment */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </m.div>

          {/* Sidebar */}
          <m.div 
            className="lg:col-span-1 space-y-4 overflow-y-auto min-h-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Upload Section */}
            <m.div variants={listItem}>
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Upload className="h-4 w-4 text-primary" />
                    Upload de Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Envie documentos médicos (PDF, imagens) para análise pela IA.
                  </p>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    disabled={uploadMutation.isPending}
                    className="cursor-pointer"
                  />

                  <AnimatePresence>
                    {selectedFile && (
                      <m.div 
                        className="p-3 bg-muted/50 rounded-lg border"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleUploadDocument}
                    disabled={!selectedFile || uploadMutation.isPending}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadMutation.isPending ? 'Enviando...' : 'Enviar Documento'}
                  </Button>

                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                      <Lightbulb className="h-3 w-3 mt-0.5 text-warning shrink-0" />
                      <span>
                        <strong>Dica:</strong> A IA pode analisar seus documentos médicos
                        e responder perguntas específicas sobre eles.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* Documents List */}
            <m.div variants={listItem}>
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-primary" />
                    Documentos Enviados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentList
                    documents={transformedDocuments}
                    loading={isLoadingDocuments}
                    className="max-h-60"
                  />
                </CardContent>
              </Card>
            </m.div>

            {/* Conversation Info */}
            <AnimatePresence>
              {conversationId && (
                <m.div
                  variants={listItem}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Info className="h-4 w-4 text-primary" />
                        Informações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-1">
                        ID da Conversa:
                      </p>
                      <div className="flex items-center gap-2">
                        <p 
                          className="text-xs font-mono text-foreground break-all bg-muted/50 p-2 rounded flex-1"
                          title={conversationId}
                        >
                          {truncateId(conversationId)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={handleCopyId}
                          title="Copiar ID completo"
                        >
                          {copiedId ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </m.div>
    </MainLayout>
  );
}

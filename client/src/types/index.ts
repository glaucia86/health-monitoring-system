export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  patientId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  cpf: string;
  birthdate: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  nextDose?: Date | string;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exam {
  id: string;
  patientId: string;
  type: string;
  date: Date;
  result?: string;
  notes?: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  specialty: string;
  date: Date;
  location: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  patientId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardData {
  upcomingAppointments: Appointment[];
  todayMedications: Medication[];
  recentExams: Exam[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'medication' | 'exam' | 'appointment';
  message: string;
  severity: 'info' | 'warning' | 'error';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
}

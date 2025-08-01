export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  category?: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  messages: Message[];
  createdAt: Date;
  resolvedAt?: Date;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface SupportMetrics {
  totalQueries: number;
  resolvedQueries: number;
  averageResponseTime: number;
  customerSatisfactionRate: number;
  escalationRate: number;
}
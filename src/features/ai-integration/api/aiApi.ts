import { api } from 'shared/api';

interface AIRecommendationRequest {
  destination: string;
  budget: number;
  duration: number;
  preferences: string[];
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  estimatedCost: number;
  category: string;
  confidence: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const aiApi = {
  getRecommendations: (data: AIRecommendationRequest) => api.post<AIRecommendation[]>('/ai/recommendations', data),

  chatWithBot: (message: string, conversationId?: string) =>
    api.post<{ response: string; conversationId: string }>('/ai/chat', {
      message,
      conversationId,
    }),

  getChatHistory: (conversationId: string) => api.get<ChatMessage[]>(`/ai/chat/${conversationId}/history`),

  generateItinerary: (tripId: string) => api.post<{ itinerary: unknown }>(`/ai/trips/${tripId}/generate-itinerary`),
};

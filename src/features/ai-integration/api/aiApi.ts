interface ChatResponse {
  response: string;
  conversationId: string;
}

interface RecommendationParams {
  destination: string;
  budget: number;
  duration: number;
  preferences: string[];
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
}

export const aiApi = {
  chatWithBot: async (message: string, conversationId?: string): Promise<ChatResponse> => {
    // Mock implementation - replace with actual API call
    return {
      response: `AI response to: ${message}`,
      conversationId: conversationId || crypto.randomUUID(),
    };
  },

  getRecommendations: async (params: RecommendationParams): Promise<Recommendation[]> => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: '1',
        title: `Recommendation for ${params.destination}`,
        description: 'AI-generated travel recommendation',
        price: params.budget * 0.8,
        rating: 4.5,
      },
    ];
  },
};
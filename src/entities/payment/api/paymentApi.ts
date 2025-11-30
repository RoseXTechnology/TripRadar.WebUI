import type { CreateSubscriptionCheckoutRequest, CreateSubscriptionCheckoutResponse } from 'shared/api';
import { apiClient } from 'shared/api';
import { useAuthStore } from 'shared/store/auth';

export const paymentApi = {
  createCheckout: async (data: CreateSubscriptionCheckoutRequest): Promise<CreateSubscriptionCheckoutResponse> => {
    const { user } = useAuthStore.getState();
    if (!user?.username) {
      throw new Error('User not authenticated');
    }

    const endpoint = `/api/v1/payments/users/${user.username}/create-subscription-checkout`;
    return apiClient.post(endpoint, data);
  },
};

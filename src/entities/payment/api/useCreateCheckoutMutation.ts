import { useMutation } from '@tanstack/react-query';
import type { CreateSubscriptionCheckoutRequest } from 'shared/api';
import { paymentApi } from './paymentApi';

export const useCreateCheckoutMutation = () => {
  return useMutation({
    mutationFn: (data: CreateSubscriptionCheckoutRequest) => paymentApi.createCheckout(data),
    onSuccess: response => {
      // Redirect to Stripe checkout
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      }
    },
  });
};

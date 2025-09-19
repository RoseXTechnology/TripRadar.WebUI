export interface Price {
  amount: number;
  currency: string;
  tierName: string;
  tokensPerMonthLimit: number;
  billingPeriodName: string;
}

export interface PricesResponse {
  prices: Price[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  cta: string;
  tokensPerMonthLimit?: number;
}

export interface PricingResponse {
  tiers: PricingTier[];
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  pricing: string;
  rating: number;
  features: string[];
  website?: string;
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
}

export interface FilterState {
  category: string;
  pricing: string;
  search: string;
}

export interface SubscriptionFormData {
  email: string;
  name: string;
}
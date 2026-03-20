export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface SubscribeFormData {
  email: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  features: readonly string[];
  icon: string;
}

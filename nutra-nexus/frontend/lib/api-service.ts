declare const process: { env: { NEXT_PUBLIC_API_URL?: string; BACKEND_URL?: string } };

// Different URLs for server-side (in frontend API routes) vs client-side
const getApiBaseUrl = () => {
  // If running server-side (no window), use backend service name for inter-container communication
  if (typeof window === 'undefined') {
    return process.env.BACKEND_URL || 'http://backend:8000';
  }
  // If running client-side (browser), use localhost to reach backend from user's browser
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    flavor?: string;
  }>;
  totalAmount: number;
}

interface Order {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    flavor?: string;
  }>;
  total_amount: string;  // PostgreSQL DECIMAL fields are returned as strings
  currency: string;
  status: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

interface CheckoutSession {
  sessionId: string;
  url: string;
}

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receiptUrl?: string;
  created: number;
  metadata: Record<string, string>;
}

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Create a new order
  static async createOrder(orderData: CreateOrderData): Promise<{ orderNumber: string; status: string }> {
    const response = await this.request<{ orderNumber: string }>(
      '/api/orders',
      {
        method: 'POST',
        body: JSON.stringify(orderData),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to create order');
    }

    return {
      orderNumber: response.data.orderNumber,
      status: 'pending'
    };
  }

  // Get order by order number
  static async getOrder(orderNumber: string): Promise<Order> {
    const response = await this.request<Order>(`/api/orders/${orderNumber}`);

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch order');
    }

    return response.data;
  }

  // Create Stripe checkout session
  static async createCheckoutSession(
    orderNumber: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<CheckoutSession> {
    const response = await this.request<CheckoutSession>(
      '/api/stripe/create-checkout-session',
      {
        method: 'POST',
        body: JSON.stringify({
          orderNumber,
          successUrl,
          cancelUrl,
        }),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to create checkout session');
    }

    return response.data;
  }

  // Get Stripe session status
  static async getSessionStatus(sessionId: string): Promise<any> {
    const response = await this.request(`/api/stripe/session/${sessionId}`);

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to get session status');
    }

    return response.data;
  }

  // Get payment intent details
  static async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const response = await this.request<PaymentIntent>(`/api/stripe/payment-intent/${paymentIntentId}`);

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to get payment intent');
    }

    return response.data;
  }

  // Health check
  static async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.request<{ status: string; timestamp: string }>('/health');

    if (!response.success || !response.data) {
      throw new Error('Backend health check failed');
    }

    return response.data;
  }
} 
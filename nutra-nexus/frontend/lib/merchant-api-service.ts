// Merchant API Service for backend communication

interface MerchantCredentials {
  username: string;
  password: string;
}

interface MerchantAuthResponse {
  success: boolean;
  data: {
    token: string;
    expiresIn: string;
    merchant: {
      username: string;
      role: string;
    };
  };
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
  total_amount: string;
  currency: string;
  status: string;
  stripe_payment_intent_id?: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
  tracking_number?: string;
}

interface OrdersResponse {
  success: boolean;
  data: {
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      hasMore: boolean;
    };
  };
}

interface OrderStatsResponse {
  success: boolean;
  data: {
    ordersByStatus: Array<{
      status: string;
      count: string;
      total_amount: string;
    }>;
    totalOrders: number;
    totalRevenue: number;
    recentOrders: Array<{
      order_number: string;
      customer_name: string;
      total_amount: string;
      status: string;
      created_at: string;
    }>;
  };
}

interface RefundResponse {
  success: boolean;
  message: string;
  data: {
    orderNumber: string;
    refundId: string;
    amount: number;
    currency: string;
    status: string;
  };
}

interface UpdateStatusResponse {
  success: boolean;
  message: string;
  data: {
    orderNumber: string;
    status: string;
    trackingNumber?: string;
  };
}

interface ApiError {
  success: false;
  error: string | { message: string };
}

class MerchantApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    // Try to load token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('merchant_token');
    }
  }

  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || data.error || 'Request failed');
    }

    return data;
  }

  // Authentication
  async login(credentials: MerchantCredentials): Promise<MerchantAuthResponse> {
    const response = await fetch(`${this.baseUrl}/api/merchant/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await this.handleResponse<MerchantAuthResponse>(response);
    
    // Store token for future requests
    this.token = data.data.token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('merchant_token', this.token);
      localStorage.setItem('merchant_user', JSON.stringify(data.data.merchant));
    }

    return data;
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('merchant_token');
      localStorage.removeItem('merchant_user');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getMerchantData(): { username: string; role: string } | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('merchant_user');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  // Orders Management
  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<OrdersResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);

    const url = `${this.baseUrl}/api/merchant/orders${searchParams.toString() ? `?${searchParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<OrdersResponse>(response);
  }

  async getOrder(orderNumber: string): Promise<{ success: boolean; data: Order }> {
    const response = await fetch(`${this.baseUrl}/api/merchant/orders/${orderNumber}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<{ success: boolean; data: Order }>(response);
  }

  async updateOrderStatus(
    orderNumber: string,
    status: string,
    trackingNumber?: string
  ): Promise<UpdateStatusResponse> {
    const body: any = { status };
    if (trackingNumber) {
      body.trackingNumber = trackingNumber;
    }

    const response = await fetch(`${this.baseUrl}/api/merchant/orders/${orderNumber}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<UpdateStatusResponse>(response);
  }

  // Refunds
  async processRefund(
    orderNumber: string,
    amount?: number,
    reason?: string
  ): Promise<RefundResponse> {
    const body: any = {};
    if (amount) body.amount = amount;
    if (reason) body.reason = reason;

    const response = await fetch(`${this.baseUrl}/api/merchant/orders/${orderNumber}/refund`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<RefundResponse>(response);
  }

  // Statistics
  async getStats(): Promise<OrderStatsResponse> {
    const response = await fetch(`${this.baseUrl}/api/merchant/stats`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<OrderStatsResponse>(response);
  }

  async getRefunds(params?: { page?: number; limit?: number; status?: string; }): Promise<{ success: boolean; data: { refunds: any[]; pagination: any } }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status);

    const response = await fetch(`${this.baseUrl}/api/merchant/refunds?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<{ refunds: any[]; pagination: any }>(response);
  }

  async getAnalytics(dateRange?: string): Promise<{ success: boolean; data: any }> {
    const queryParams = new URLSearchParams();
    if (dateRange) queryParams.append('dateRange', dateRange);

    const response = await fetch(`${this.baseUrl}/api/merchant/analytics?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<any>(response);
  }

  // Test endpoint
  async testConnection(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/api/merchant/test`);
    return this.handleResponse<{ success: boolean; message: string }>(response);
  }
}

export const merchantApiService = new MerchantApiService();

export type {
  MerchantCredentials,
  MerchantAuthResponse,
  Order,
  OrdersResponse,
  OrderStatsResponse,
  RefundResponse,
  UpdateStatusResponse,
  ApiError
}; 
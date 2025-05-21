import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';
import { convertToMarkdown } from '../markdown';

const clientId = "01e89dc6-66a3-4175-a6fd-c13f3e1d0bda"
const clientSecret ="B6C69FBA6BC01F9722090314D6F05F3CF7E92600"
const retailer ="testmcp"
export class KiotVietService {
  private token: string = '';
  private tokenExpiry: Date = new Date();
  private client: AxiosInstance;

  constructor() {
    // Validate config
    if (!clientId || !clientSecret || !retailer) {
      throw new Error('Missing KiotViet configuration');
    }

    // Initialize axios client
    this.client = axios.create({
      baseURL: 'https://public.kiotapi.com',
      headers: { 'Content-Type': 'application/json' }
    });

    // Add auth interceptor
    this.client.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          await this.authenticate();
          error.config.headers['Authorization'] = `Bearer ${this.token}`;
          return this.client(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  async authenticate(): Promise<void> {
    try {
      const response = await axios.post(
        'https://id.kiotviet.vn/connect/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          scopes: 'PublicApi.Access'
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      this.token = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      this.client.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.client.defaults.headers.common['Retailer'] = retailer;
    } catch (error: any) {
      console.error('Auth failed:', error.response?.data || error.message);
      throw error;
    }
  }

  private async ensureAuth(): Promise<void> {
    if (!this.token || new Date() > this.tokenExpiry) {
      await this.authenticate();
    }
  }

  async toMarkdown(response: any): Promise<string> {
    return convertToMarkdown(response);
  }

  //-------------- Products ----------------//
  async getProducts(args: any): Promise<any> {
  await this.ensureAuth();
  const response = await this.client.get('/products', { params: args });
  return response.data;
}

  //-------------- Categories ----------------//

  async getCategories(args: any): Promise<any> {
    await this.ensureAuth();
    const response = await this.client.get('/categories', { params: args });
    return response.data;
  }

  async getCategoryById(id: string): Promise<any> {
    await this.ensureAuth();
    const response = await this.client.get(`/categories/${id}`);
    return response.data;
  }

  //-------------- Orders ----------------//
  async getOrders(args: any): Promise<any> {
    await this.ensureAuth();
    const response = await this.client.get('/orders', { params: args });
    return response.data;
  }
  async getOrderById(id: string): Promise<any> {
    await this.ensureAuth();
    const response = await this.client.get(`/orders/${id}`);
    return response.data;
  }

  // ------------- Customers ----------------//
  async getCustomers(args: any): Promise<any> {
    await this.ensureAuth();
    const response = await this.client.get('/customers', { params: args });
    return response.data;
  }

  //
}

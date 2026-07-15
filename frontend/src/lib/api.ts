// API Client for Room Management Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || error.message || 'Request failed');
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await this.handleResponse<{ user: any; token: string }>(response);
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  }

  async register(email: string, password: string, full_name?: string, role?: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, role }),
    });
    const data = await this.handleResponse<{ user: any; token: string }>(response);
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  }

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ user: any }>(response);
  }

  // Rooms endpoints
  async getRooms() {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ rooms: any[] }>(response);
  }

  async getRoom(id: string) {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ room: any }>(response);
  }

  async createRoom(room: any) {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(room),
    });
    return this.handleResponse<{ room: any }>(response);
  }

  async updateRoom(id: string, room: any) {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(room),
    });
    return this.handleResponse<{ room: any }>(response);
  }

  async deleteRoom(id: string) {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }

  // Bookings endpoints
  async getBookings() {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ bookings: any[] }>(response);
  }

  async getBooking(id: string) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ booking: any }>(response);
  }

  async createBooking(booking: any) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(booking),
    });
    return this.handleResponse<{ booking: any }>(response);
  }

  async updateBooking(id: string, booking: any) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(booking),
    });
    return this.handleResponse<{ booking: any }>(response);
  }

  async deleteBooking(id: string) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }

  // Housekeeping endpoints
  async getHousekeepingTasks() {
    const response = await fetch(`${API_BASE_URL}/housekeeping`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ tasks: any[] }>(response);
  }

  async createHousekeepingTask(task: any) {
    const response = await fetch(`${API_BASE_URL}/housekeeping`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(task),
    });
    return this.handleResponse<{ task: any }>(response);
  }

  async updateHousekeepingTask(id: string, task: any) {
    const response = await fetch(`${API_BASE_URL}/housekeeping/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(task),
    });
    return this.handleResponse<{ task: any }>(response);
  }

  async deleteHousekeepingTask(id: string) {
    const response = await fetch(`${API_BASE_URL}/housekeeping/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }

  // Invoices endpoints
  async getInvoices() {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ invoices: any[] }>(response);
  }

  async getInvoice(id: string) {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ invoice: any }>(response);
  }

  async createInvoice(invoice: any) {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(invoice),
    });
    return this.handleResponse<{ invoice: any }>(response);
  }

  async updateInvoice(id: string, invoice: any) {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(invoice),
    });
    return this.handleResponse<{ invoice: any }>(response);
  }

  async deleteInvoice(id: string) {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }
}

export const api = new ApiClient();
export default api;

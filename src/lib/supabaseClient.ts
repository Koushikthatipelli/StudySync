const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Auth API functions
export const authAPI = {
  async register(email: string, password: string, name?: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async logout() {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    localStorage.removeItem('token');
  },

  async getMe() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async updateProfile(data: any) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  clearToken() {
    localStorage.removeItem('token');
  },
};

// Users API functions
export const usersAPI = {
  async getAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  async getUserById(id: string) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },
};

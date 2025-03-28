const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';

export const authService = {
  async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Failed to log in');

    const data = await res.json();
    // Store token in localStorage for subsequent requests
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data.user ?? data;
  },

  async register(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password}),
    });

    if (!res.ok) throw new Error('Failed to register');

    const data = await res.json();
    
    return data.message;
  },

  async logout() {
    localStorage.removeItem('token');
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Not authenticated');

    const data = await res.json();
    return data.user ?? data;
  },
};

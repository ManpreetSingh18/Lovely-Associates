// Authentication utilities
export interface AuthUser {
  email: string;
  isAuthenticated: boolean;
}

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@lovely.com',
  password: 'secure123'
};

// Simple token for demo purposes (in production, use proper JWT)
const AUTH_TOKEN = 'lovely_admin_authenticated';
const AUTH_STORAGE_KEY = 'lovely_admin_auth';

export const authenticateUser = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const setAuthToken = (): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return token === AUTH_TOKEN;
};

export const getCurrentUser = (): AuthUser | null => {
  if (isAuthenticated()) {
    return {
      email: ADMIN_CREDENTIALS.email,
      isAuthenticated: true
    };
  }
  return null;
};
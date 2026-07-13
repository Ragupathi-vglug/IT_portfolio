import React, { createContext, useContext, useState, useCallback } from 'react';
import { AUTH_TOKEN_KEY, loginRequest } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('facultyAdminUsername'));

  const login = useCallback(async (usernameInput: string, password: string) => {
    const data = await loginRequest(usernameInput, password);
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem('facultyAdminUsername', data.username);
    setToken(data.token);
    setUsername(data.username);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('facultyAdminUsername');
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

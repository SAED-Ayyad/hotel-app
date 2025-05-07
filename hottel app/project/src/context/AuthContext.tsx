import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('hotel_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use our mock data and any password works
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      // In a real app, we would verify the password here
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('hotel_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hotel_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
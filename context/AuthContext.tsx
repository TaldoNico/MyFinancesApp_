// @ts-nocheck
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Usuário teste fictício
  const TEST_USER = {
    email: 'teste@myfinance.com',
    password: '123456',
    name: 'Usuário Teste',
  };

  const login = (email: string, password: string): boolean => {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      setIsLoggedIn(true);
      setUser({ email: TEST_USER.email, name: TEST_USER.name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const login = useCallback((password: string) => {
    sessionStorage.setItem('admin_auth', 'true');
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

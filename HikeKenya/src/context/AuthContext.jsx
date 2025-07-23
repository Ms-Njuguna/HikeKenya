import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ content }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const Signup = () =>setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login,Signup, logout }}>
      {content}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

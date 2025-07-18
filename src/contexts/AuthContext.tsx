import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getCredentials, saveCredentials, removeCredentials } from "../utils/storage";
import { login } from "../services/auth";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkCredentials = async () => {
      const creds = await getCredentials();
      if (creds) {
        const result = await login(creds.email, creds.password);
        if (result?.token) {
          setToken(result.token);
          setUser(result.user);
        }
      }
    };
    checkCredentials();
  }, []);

  const doLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result?.token) {
        setToken(result.token);
        setUser(result.user);
        await saveCredentials(email, password);
      } else {
        console.error("Login fallido: token no recibido");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeCredentials();
  };

  return (
    <AuthContext.Provider value={{ user, token, login: doLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

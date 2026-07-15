import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "@/lib/api";

export type AppRole = "superadmin" | "admin" | "manager" | "frontdesk" | "housekeeping" | "accountant";

const normalizeRole = (value: unknown): AppRole => {
  const roleValue = typeof value === "string" ? value.trim().toLowerCase() : "";
  switch (roleValue) {
    case "superadmin":
    case "admin":
    case "manager":
    case "frontdesk":
    case "housekeeping":
    case "accountant":
      return roleValue;
    default:
      return "admin";
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  authUserId: string | null;
  user: { name: string; role: AppRole; email?: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("auth_token"));
  });
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; role: AppRole; email?: string } | null>(() => {
    const saved = localStorage.getItem("rm_user");
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved) as { name?: string; role?: string; email?: string };
      return {
        name: parsed.name || "User",
        role: normalizeRole(parsed.role),
        email: parsed.email,
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Check authentication on mount
    const token = localStorage.getItem("auth_token");
    if (token) {
      api.getCurrentUser()
        .then(({ user: apiUser }) => {
          setIsAuthenticated(true);
          setAuthUserId(apiUser.id);
          setUser({
            name: apiUser.full_name || apiUser.email?.split("@")[0] || "User",
            role: normalizeRole(apiUser.role),
            email: apiUser.email,
          });
          localStorage.setItem("rm_user", JSON.stringify({
            name: apiUser.full_name || apiUser.email?.split("@")[0] || "User",
            role: apiUser.role,
            email: apiUser.email,
          }));
        })
        .catch(() => {
          // Token invalid, clear auth state
          setIsAuthenticated(false);
          setAuthUserId(null);
          setUser(null);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("rm_user");
        });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user: apiUser } = await api.login(email, password);
      const userData = {
        name: apiUser.full_name || apiUser.email?.split("@")[0] || "User",
        role: normalizeRole(apiUser.role),
        email: apiUser.email,
      };
      setIsAuthenticated(true);
      setAuthUserId(apiUser.id);
      setUser(userData);
      localStorage.setItem("rm_user", JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    setIsAuthenticated(false);
    setAuthUserId(null);
    setUser(null);
    localStorage.removeItem("rm_user");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUserId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

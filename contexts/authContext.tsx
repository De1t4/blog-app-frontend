"use client";
import React, { useEffect } from "react";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AuthContextProps, AuthTokens } from "../app/interface/auth.model";

export const AuthContext = createContext<AuthContextProps>({
  login: () => { },
  logout: () => { },
  isLoggedIn: false,
  authTokens: null,
});

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem(AUTH_TOKENS_KEY) || "null")
      : null
  );
  const login = useCallback(function (authTokens: AuthTokens) {
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authTokens));
    setAuthTokens(authTokens);
  }, []);
  const logout = useCallback(function () {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
  }, []);


  useEffect(() => {
    const handleStorageChange = () => {
      const storedTokens = window.localStorage.getItem(AUTH_TOKENS_KEY);
      if (!storedTokens) {
        setAuthTokens(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value: AuthContextProps = useMemo(() => ({
    login,
    logout,
    authTokens,
    isLoggedIn: !!authTokens,
  }), [authTokens, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
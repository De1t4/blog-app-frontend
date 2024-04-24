"use client";
import React from "react";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface AuthTokens {
  token: string;
  refresh_token: string;
  email: string
  idUser: number
  lastname: string
  name: string
}

export interface AuthContextProps {
  login: (authTokens: AuthTokens) => void;
  logout: () => void;
  isLoggedIn: boolean;
  authTokens: AuthTokens | null;
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null,
});

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const authTokensInLocalStorage = typeof window !== "undefined"
    ? window.localStorage.getItem(AUTH_TOKENS_KEY)
    : null;

  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(
    authTokensInLocalStorage ? JSON.parse(authTokensInLocalStorage) : null
  );

  const login = useCallback(function (authTokens: AuthTokens) {
    window.localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authTokens));
    setAuthTokens(authTokens);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(AUTH_TOKENS_KEY);
    setAuthTokens(null);
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
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
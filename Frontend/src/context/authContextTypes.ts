import { createContext } from 'react';

export interface AuthToken {
    access: string;
    refresh: string;
}

export interface User {
    user_id: number;
    username: string;
}

export interface AuthContextType {
    user: User | null;
    authTokens: AuthToken | null;
    setUser: (user: User | null) => void;
    setAuthTokens: (tokens: AuthToken | null) => void;
    logoutUser: () => void;
    loginUser: (tokens: AuthToken) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

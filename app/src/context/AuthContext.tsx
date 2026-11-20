import { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "./authReducer";
import * as Network from 'expo-network';
import { setDeviceIPv4 } from "../utils/singleton";

export interface AuthState {
    isLoggedIn: boolean;
    username: string | undefined;
    avatar: string | undefined;
    ipv4: string | null;
}

export const AuthInicialState: AuthState = {
    isLoggedIn: false,
    username: undefined,
    avatar: undefined,
    ipv4: null
};

export interface AuthContextProps {
    authState: AuthState;
    singIn: (user?: { username: string; avatar?: string }) => Promise<void>;
    logout: () => void;
    changeAvatar: (avatar: string) => void;
    chageUsername: (username: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(authReducer, AuthInicialState);

    // 1. Obtener la IP apenas se monta la app (sin importar el login)

    const singIn = async (user?: { username: string; avatar?: string }) => {
        // Ya no necesitas obtener la IP aquí, ya está en el estado.
        // Solo actualizas usuario y avatar, manteniendo la IP actual.
        dispatch({ 
            type: 'singIn', 
            payload: { 
                ...user, 
            }
        });
    };

    const logout = () => dispatch({ type: 'logout' });
    const chageUsername = (username: string) => dispatch({ type: 'chageUsername', payload: username });
    const changeAvatar = (avatar: string) => dispatch({ type: 'changeAvatar', payload: avatar });

    return (
        <AuthContext.Provider value={{ authState, singIn, logout, chageUsername, changeAvatar }}>
            {children}
        </AuthContext.Provider>
    );
};

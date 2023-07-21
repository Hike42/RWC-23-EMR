import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthState } from ".";
import jwt_decode from "jwt-decode";

const initialAuthState: AuthState = {
    user: null,
    isAuth: false
}

export const AuthContext = createContext<AuthContextProps>({
    authState: initialAuthState,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }: any) =>  {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && !authState.user) login(token);
    })

    const login = (token: string) => {
        localStorage.setItem('token', token);

        setAuthState({
            user: jwt_decode(token),
            isAuth: true
        })
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState(initialAuthState);
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


interface user {
    exp: number,
    iat: number,
    roles : string[]
    username: string
}

export interface AuthState {
    user: null | user,
    isAuth: boolean
}

export interface AuthContextProps {
    authState: AuthState;
    login: (token: string) => void;
    logout: () => void;
}
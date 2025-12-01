import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    full_name: string;
    role: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const logout = () => setUser(null);
    const login = (userData: User) => setUser(userData);
    const register = (userData: User) => {
        // In a real app, this would call an API
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // Return a dummy context or throw error. 
        // For migration safety, returning a safe default might be better if usage is widespread without provider
        // But here we wrapped App, so throwing is fine.
        return { user: null, login: () => { }, logout: () => { }, register: () => { } };
    }
    return context;
};

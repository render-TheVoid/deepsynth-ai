import { createContext, type ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { RedirectLoginOptions, AppState } from "@auth0/auth0-react";
import type { LogoutOptions, User } from "@auth0/auth0-react";

type AuthContextType = {
    loginWithRedirect: (options?: RedirectLoginOptions<AppState>) => Promise<void>;
    logout: (options?: LogoutOptions) => void;
    user: User | undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider:React.FC<AuthContextProviderProps> = ({ children }) => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log("loginwithredirect: ", loginWithRedirect)

    return (
        <AuthContext.Provider value={{ loginWithRedirect, logout, user, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
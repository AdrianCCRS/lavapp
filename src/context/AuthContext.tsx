import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@config/firebase.config";
import type { User as FirebaseUser } from "firebase/auth";
import type { User as CustomUser } from "../features/auth/types";
import { getUserProps } from "../features/auth/services/auth.service";

interface AuthContextType {
    user: FirebaseUser | null;
    customUser: CustomUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    customUser: null,
    loading: true,
});

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [customUser, setCustomUser] = useState<CustomUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const res = await getUserProps();
                    setCustomUser(res);
                } catch (err){
                    console.error("Error fetching user properties:", err);
                    setCustomUser(null);
                }
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, customUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
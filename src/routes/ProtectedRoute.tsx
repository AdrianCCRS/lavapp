import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinnerPage from "@components/SpinnerPage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) return <SpinnerPage />;
    if (!user) return <Navigate to="/login" replace />;
    
    return children;
}
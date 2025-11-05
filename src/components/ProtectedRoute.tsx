import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "ADMIN" | "USER";
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  console.log({user});
  

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

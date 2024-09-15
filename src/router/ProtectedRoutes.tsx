import { ReactElement } from "react";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  {
    const { user } = useAuth();
    if (!user || user.access_token === "") {
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export const RedirectHomeRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export const AdminRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

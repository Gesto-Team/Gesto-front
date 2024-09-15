import { ReactElement } from "react";
import { authServices } from "../services/auth.services";
import { useAuth } from "./hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  if (!user || user.access_token === "") {
    authServices.refreshTokens().then((response) => {
      const userId = jwtDecode(response.data.access_token).sub;
      if (!userId) {
        throw new Error("No user ID found in token");
      }
      setUser({ userId: userId, access_token: response.data.access_token });
      navigate("/login");
    });
  }
  return children;
};

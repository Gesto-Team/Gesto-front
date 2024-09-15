import { createContext } from "react";
import { Role, UserLocalStorage } from "../models/user.model";

interface AuthContextType {
  user: UserLocalStorage | null;
  setUser: (user: UserLocalStorage) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: { userId: "", access_token: "", role: Role.USER },
  setUser: () => {},
  logout: async () => {},
});

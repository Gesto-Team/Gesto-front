import { createContext } from "react";
import { UserData, UserLocalStorage } from "../models/user.model";

interface AuthContextType {
  user: UserLocalStorage | null;
  setUser: (user: UserLocalStorage) => void;
  login: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: { userId: "", access_token: "" },
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

import { jwtDecode } from "jwt-decode";
import axiosApiInstance from "./AxiosConfig";
import { UserData } from "../models/user.model";

export const login = (userData: UserData) => {
  axiosApiInstance
    .post(`auth/login`, userData)
    .then((response) => saveUserDataInLocalStorage(response.data.access_token))
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
    });
};

export const register = (userData: UserData) => {
  axiosApiInstance
    .post(`auth/register`, userData)
    .then((response) => saveUserDataInLocalStorage(response.data.access_token))
    .catch((error) => {
      console.error("Erreur lors de l'inscription:", error);
    });
};

export const logout = () => {
  localStorage.removeItem("userID");
  localStorage.removeItem("accessToken");
};

export const refreshTokens = async () => {
  return axiosApiInstance.get(`auth/refresh`);
};

const saveUserDataInLocalStorage = (accessToken: string): void => {
  const userId = jwtDecode(accessToken).sub;
  if (!userId) {
    throw new Error("No user ID found in token");
  }
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("userID", userId);
};

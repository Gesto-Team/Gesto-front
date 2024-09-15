import axiosApiInstance from "./AxiosConfig";
import { UserData } from "../models/user.model";

export const authServices = {
  login: (userData: UserData) => {
    return axiosApiInstance.post(`auth/login`, userData);
  },

  register: (userData: UserData) => {
    return axiosApiInstance.post(`auth/register`, userData);
  },

  logout: (): Promise<null> => {
    // TODO in backend (remove cookie)
    return Promise.resolve(null);
  },

  refreshTokens: async () => {
    return axiosApiInstance.get(`auth/refresh`);
  },
};

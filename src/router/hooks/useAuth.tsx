import { ReactElement, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../models/user.model";
import { authServices } from "../../services/auth.services";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../AuthContext";
import axiosApiInstance from "../../services/AxiosConfig";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useLocalStorage("user", {
    userId: "",
    access_token: "",
  });
  const navigate = useNavigate();

  // Login
  const login = async (userData: UserData) => {
    authServices
      .login(userData)
      .then((response) => {
        const userId = getIdByToken(response.data.access_token);
        setUser({ userId: userId, access_token: response.data.access_token });
        navigate("/dashboard");
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  // Logout
  const logout = async () => {
    authServices.logout().then(() => {
      setUser(null);
    });
  };

  const register = async (userData: UserData) => {
    authServices
      .register(userData)
      .then((response) => {
        const userId = getIdByToken(response.data.access_token);
        setUser({ userId: userId, access_token: response.data.access_token });
        navigate("/dashboard");
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  // Auth interceptor

  axiosApiInstance.interceptors.request.use(function (config) {
    if (user && user.access_token) {
      config.headers["Authorization"] = `Bearer ${user.access_token}`;
    }
    return config;
  });

  // Response interceptor for API calls
  axiosApiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        error.config.url.slice(0, 4) !== "auth"
      ) {
        console.log(originalRequest._retry);

        // If response status is 401 and is not a refresh token request => refresh token
        originalRequest._retry = true;
        const response = await axiosApiInstance.get(`auth/refresh`);
        const access_token = response.data.access_token;
        localStorage.setItem("accessToken", access_token);
        axiosApiInstance.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return axiosApiInstance(originalRequest);
      } else if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        error.config.url.slice(5, 13) === "refresh"
      ) {
        // If response status is 401 and is a refresh token request => go to login page
        localStorage.removeItem("accessToken");
        if (window.location.href !== "/login") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      register,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const getIdByToken = (token: string): string => {
  const userId = jwtDecode(token).sub;
  if (!userId) {
    throw new Error("No user ID found in token");
  }
  return userId;
};

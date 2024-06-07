import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
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
      error.config.url !== "auth/refresh"
    ) {
      originalRequest._retry = true;
      const response = await axiosApiInstance.get(`auth/refresh`);
      const access_token = response.data.access_token;
      localStorage.setItem("accessToken", access_token);
      console.log();
      axiosApiInstance.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
      return axiosApiInstance(originalRequest);
    } else {
      localStorage.removeItem("accessToken");
      if (window.location.href !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;

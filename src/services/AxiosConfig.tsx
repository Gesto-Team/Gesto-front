import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosApiInstance;

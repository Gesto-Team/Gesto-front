import axiosInstance from "../api";

interface AxiosConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export const get = async <T>(
  url: string,
  config: AxiosConfig = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data: any,
  config: AxiosConfig = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const patch = async <T>(
  url: string,
  data: any,
  config: AxiosConfig = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

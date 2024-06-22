import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosHeaders,
} from "axios";

const apiUrl: string = import.meta.env.VITE_BACK_URL as string;

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default instance;
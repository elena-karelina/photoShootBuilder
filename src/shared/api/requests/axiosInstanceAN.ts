import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosHeaders,
} from "axios";
import { useAuth } from "../../../hooks/useAuth";

const apiUrl: string = import.meta.env.VITE_BACK_URL_ANYA as string;

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = useAuth();
    const token = user.token;
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

import axios from "axios";
import { getValueFromLocalStorage } from "../components/helper/helper";

export const request = axios.create({
  baseURL: "http://localhost:8080/api",
});

request.interceptors.request.use(
  (config: any) => {
    const token: string = getValueFromLocalStorage("token")!;
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => Promise.reject(error)
);

import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface errorModel {
  message?: string;
}

export const printErrorMessage = (err: unknown) => {
  const error: AxiosError = err as unknown as AxiosError;
  if (error?.response?.data) {
    const data = error.response.data as errorModel;
    return data?.message!;
  }
  if (error?.message) return error?.message;
  return String(error);
};

export const setValueInLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, value);

export const getValueFromLocalStorage = (key: string) =>
  window.localStorage.getItem(key);

export const deleteValueFromLocalStorage = (key: string) =>
  window.localStorage.removeItem(key);

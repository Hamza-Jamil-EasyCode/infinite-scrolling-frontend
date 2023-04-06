import { request } from "../api/request";
import { getValueFromLocalStorage } from "../components/helper/helper";
import { API_ENDPOINTS } from "../constants/api_end_points";
import { LoginModel, RegisterModel } from "../models/adminModel";

export const loginUser = async (postData: LoginModel) =>
  await request({
    method: "POST",
    url: API_ENDPOINTS.ADMINS.ADMIN_LOGIN,
    data: postData,
  });

export const registerUser = async (postData: RegisterModel) =>
  await request({
    method: "POST",
    url: API_ENDPOINTS.ADMINS.ADMIN_REGISTER,
    data: postData,
  });

export const checkUserExist = async () =>
  await request({
    method: "GET",
    url: `${API_ENDPOINTS.ADMINS.CHECK_USER_EXIST}/${getValueFromLocalStorage(
      "userID"
    )}`,
  });

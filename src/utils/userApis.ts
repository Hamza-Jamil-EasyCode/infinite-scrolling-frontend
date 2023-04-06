import { request } from "../api/request";
import { getValueFromLocalStorage } from "../components/helper/helper";
import { API_ENDPOINTS } from "../constants/api_end_points";
import { UsersModel } from "../models/userModel";

export const getAllUsersWithDetails = async (
  pageNumber: number,
  limit: number
) =>
  await request({
    method: "GET",
    url: `${API_ENDPOINTS.USERS.GET_ALL_USERS}?pageNumber=${pageNumber}&limit=${limit}`,
  });

export const getUser = async (userID: string) =>
  await request({
    method: "GET",
    url: `${API_ENDPOINTS.USERS.GET_ALL_USERS}/${userID}`,
  });

export const addNewUser = async (postData: UsersModel) =>
  await request({
    method: "POST",
    data: postData,
    url: API_ENDPOINTS.USERS.ADD_USER,
  });

export const updateUser = async (userID: string, postData: UsersModel) =>
  await request({
    method: "PUT",
    data: postData,
    url: `${API_ENDPOINTS.USERS.ADD_USER}/${userID}`,
  });

export const isActivateUser = async (userID: string, isActive: boolean) =>
  await request({
    method: "PUT",
    data: { isActive },
    url: `${API_ENDPOINTS.USERS.ADD_USER}/delete/${userID}`,
  });

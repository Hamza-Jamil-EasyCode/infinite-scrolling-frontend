import { request } from "../api/request";
import { API_ENDPOINTS } from "../constants/api_end_points";

export const getTotalUsers = async () =>
  await request({
    method: "GET",
    url: API_ENDPOINTS.STATS.GET_TOTAL_USERS,
  });


export const API_ENDPOINTS = {
  ADMINS: {
    ADMIN_LOGIN: "/admin/login",
    ADMIN_REGISTER: "/admin/register",
    GET_ADMIN: "/admin",
    CHECK_USER_EXIST: "/admin/exist",
  },
  CATEGORY: {
    CREATE_CATEGORY: "/category",
    UPDATE_CATEGORY: "/category",
    UPDATE_CATEGORY_STATUS: "/category/status",
    GET_CATEGORY: "/category",
    GET_ALL_CATEGORIES: "/category",
  },
  CAR: {
    CREATE_CAR: "/cars",
    UPDATE_CAR: "/cars",
    UPDATE_CAR_STATUS: "/cars/status",
    GET_CAR: "/cars",
    GET_ALL_CARS: "/cars",
  },
  STATS: {
    GET_TOTAL_USERS: "/stats/total/users",
  },
  USERS: {
    GET_ALL_USERS: "/users",
    ADD_USER: "/users",
  },
};

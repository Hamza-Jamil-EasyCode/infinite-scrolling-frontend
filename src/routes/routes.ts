import { lazy } from "react";
import { RoutesModel } from "../models/routeModel";
const Login = lazy(() => import("../components/auth/Login"));
const SignUp = lazy(() => import("../components/auth/SignUp"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const UserListing = lazy(() => import("../components/users/UserListing"));
const UserForm = lazy(() => import("../components/users/UserForm"));

export const allRoutes: RoutesModel[] = [
  {
    path: "/",
    isIncludeInSideBar: false,
    isProtected: false,
    Component: Login,
  },
  {
    path: "/login",
    isIncludeInSideBar: false,
    isProtected: false,
    Component: Login,
  },

  {
    path: "/register",
    isIncludeInSideBar: false,
    isProtected: false,
    Component: SignUp,
  },
  {
    path: "/",
    isIncludeInSideBar: false,
    isProtected: true,
    heading: "Dashboard",
    Component: Dashboard,
    sideBarHeading: "Dashboard",
  },
  {
    path: "/dashboard",
    isIncludeInSideBar: true,
    isProtected: true,
    heading: "Dashboard",
    icon: "fa-solid fa-table",
    Component: Dashboard,
    sideBarHeading: "Dashboard",
  },
  {
    path: "/users",
    isIncludeInSideBar: true,
    isProtected: true,
    heading: "Users",
    icon: "fa-solid fa-user",
    Component: UserListing,
    sideBarHeading: "Users",
  },
  {
    path: "/users/new",
    isIncludeInSideBar: false,
    isProtected: true,
    heading: "Add User",
    Component: UserForm,
    sideBarHeading: "Users",
  },
  // {
  //   path: "/users/:userID",
  //   isIncludeInSideBar: false,
  //   isProtected: true,
  //   heading: "Edit User",
  //   Component: UserForm,
  //   sideBarHeading: "Users",
  // },
  {
    path: "/user/edit/:userID/:isView",
    isIncludeInSideBar: false,
    isProtected: true,
    heading: "View User",
    Component: UserForm,
    sideBarHeading: "Users",
  },
];

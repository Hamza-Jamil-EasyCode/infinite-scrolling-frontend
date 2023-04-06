import { createContext } from "react";
import { AdminsModel } from "../../../models/adminModel";
export interface AuthCtx {
  user: AdminsModel;
  isAuthenticate: boolean;
  setUserDataContext?: (user: AdminsModel) => void;
  setIsAuthenticateContext?: (isAuth: boolean) => void;
}

// Initial Values
export const authContext = {
  user: Object(),
  isAuthenticate: false,
};

export const AuthContext = createContext<AuthCtx>(authContext);

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import {
  deleteValueFromLocalStorage,
  getValueFromLocalStorage,
  printErrorMessage,
} from "../../helper/helper";
import { AuthContext } from "./AuthContext";
import { AdminsModel } from "../../../models/adminModel";
import { checkUserExist } from "../../../utils/adminApis";

// AuthContextWrapper Props
type AuthContextWrapperProps = {
  children: React.ReactNode;
};

const AuthContextWrapper = ({ children }: AuthContextWrapperProps) => {
  // const navigate = useNavigate();
  const [user, setUserData] = useState<AdminsModel>(Object);
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);

  const setIsAuthenticateContext = (isAuth: boolean) =>
    setIsAuthenticate(isAuth);

  const setUserDataContext = (userObj: AdminsModel) => setUserData(userObj);

  const fetchInitialData = async () => {
    try {
      if (
        getValueFromLocalStorage("userID") &&
        getValueFromLocalStorage("token")
      ) {
        const resp: AxiosResponse = await checkUserExist();

        setUserData(resp.data.data);
        setIsAuthenticate(true);
      } else {
        deleteValueFromLocalStorage("token");
        deleteValueFromLocalStorage("userID");
      }
    } catch (error: any) {
      setIsAuthenticate(false);
      deleteValueFromLocalStorage("token");
      deleteValueFromLocalStorage("userID");
      toast.error(printErrorMessage(error));
      window.history.pushState({ urlPath: "/login" }, "", "/login");
    }
  };

  useEffect(() => {
    // if (getValueFromLocalStorage("userID")) setIsAuthenticate(true);

    fetchInitialData();
  }, []);

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticate,
        setIsAuthenticateContext,
        setUserDataContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;

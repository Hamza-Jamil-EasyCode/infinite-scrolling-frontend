import { AxiosResponse } from "axios";
import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import loginImage from "../../assets/login-3.png";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { printErrorMessage, setValueInLocalStorage } from "../helper/helper";
import toast from "react-hot-toast";
import { loginUser } from "../../utils/adminApis";
import { AdminsModel } from "../../models/adminModel";

interface Login {}

const Login = ({}: Login) => {
  const navigate = useNavigate();
  const { setIsAuthenticateContext, setUserDataContext } =
    useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowPasswordHandler = () => setIsShowPassword(!isShowPassword);

  const onChangeHandler = (setState: any) => (e: any) => {
    setState(e.target.value);
  };

  const _submit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const resp: AxiosResponse = await loginUser({
        email: String(email).trim().toLowerCase(),
        password,
      });

      const userData: AdminsModel = resp.data.data;
      const token: string = resp.data.token;
      const message: string = resp.data.message;

      setValueInLocalStorage("token", token);
      setValueInLocalStorage("userID", userData._id);
      setUserDataContext?.(userData);
      setIsAuthenticateContext?.(true);
      navigate("/dashboard");
      toast.success(message);
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const renderInputFields = () => (
    <>
      <div className="inputField">
        <label dir="auto" htmlFor="email">
          Email
        </label>
        <div>
          <input
            name="email"
            id="email"
            type="email"
            aria-label="email"
            onChange={onChangeHandler(setEmail)}
            value={email}
            required
          />
        </div>
      </div>

      <div className="inputField">
        <label htmlFor="password">Password</label>
        <div>
          <input
            name="password"
            id="password"
            aria-label="password"
            type={isShowPassword ? "text" : "password"}
            onChange={onChangeHandler(setPassword)}
            value={password}
            required
          />
          <i
            id="showPassword"
            onClick={toggleShowPasswordHandler}
            className={
              isShowPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
            }
          ></i>
        </div>
      </div>
    </>
  );

  const renderRightBlock = () => (
    <div className="col-md-6 d-none d-md-flex login-right">
      <img src={loginImage} alt="login" />
    </div>
  );

  const renderLeftBlock = () => (
    <div className="col-md-6 login-left">
      <div className=" d-flex flex-column align-items-center">
        <div className="title">
          <h1>Car system</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 mx-auto">
              <form onSubmit={_submit}>
                {renderInputFields()}
                <button type="submit" className="submitBtn" disabled={loading}>
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <br />
                <div className="sign-up">
                  <NavLink to="/register">Sign up?</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login container-fluid">
      <div className="row no-gutter">
        {renderLeftBlock()}
        {renderRightBlock()}
      </div>
    </div>
  );
};

export default Login;

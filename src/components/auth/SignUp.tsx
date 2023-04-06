import { AxiosResponse } from "axios";
import { useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registerImage from "../../assets/register-1.webp";
import toast from "react-hot-toast";
import { printErrorMessage } from "../helper/helper";
import Spacer from "../common/Spacer";
import { RegisterModel } from "../../models/adminModel";
import { registerUser } from "../../utils/adminApis";

interface ForgetProps {}

const SignUp = (props: ForgetProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleIsShowPassword = () => setIsShow((prev) => !prev);

  const onChangeHandler =
    (setState: Function) => (e: ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value);

  const ValidateEmail = (mail: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) ? true : false;

  const _submit = async (e: any) => {
    e.preventDefault();

    if (!ValidateEmail(email)) return;

    try {
      setLoading(true);

      const postData: RegisterModel = { email, password, name };
      const resp: AxiosResponse = await registerUser(postData);
      const message: string = resp.data.message;

      navigate("/login");
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
        <label htmlFor="userName">Username</label>

        <div>
          <input
            name="userName"
            id="userName"
            type="text"
            onChange={onChangeHandler(setName)}
            required
            value={name}
          />
        </div>
      </div>
      <Spacer verticalGap={30} />
      <div className="inputField">
        <label htmlFor="email">Email Address</label>

        <div>
          <input
            name="email"
            id="email"
            type="text"
            onChange={onChangeHandler(setEmail)}
            required
            value={email}
          />
        </div>
      </div>
      <Spacer verticalGap={30} />
      <div className="inputField">
        <label htmlFor="password">Password</label>

        <div>
          <input
            name="password"
            id="password"
            type={isShow ? "text" : "password"}
            onChange={onChangeHandler(setPassword)}
            required
            value={password}
          />
        </div>
      </div>
      <div className="showPassword">
        <label htmlFor="showPassword">Show Password</label>

        <div>
          <input
            id="showPassword"
            type="checkbox"
            onChange={toggleIsShowPassword}
            checked={isShow}
          />
        </div>
      </div>
    </>
  );

  const renderRightBlock = () => (
    <div className="col-md-6 d-none d-md-flex signUp-right">
      <img src={registerImage} alt="register" />
    </div>
  );

  const renderLeftBlock = () => (
    <div className="col-md-6 signUp-left">
      <div className="d-flex flex-column align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 mx-auto">
              <h1 className="title">Create account!</h1>
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
                    "Continue"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="row log-in">
            <p>
              Already have an account?
              <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="signUp container-fluid">
      <div className="row no-gutter">
        {renderLeftBlock()}
        {renderRightBlock()}
      </div>
    </div>
  );
};

export default SignUp;

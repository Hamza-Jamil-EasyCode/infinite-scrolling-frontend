import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getValueFromLocalStorage } from "../helper/helper";
// import { AuthContext } from "../../context/ContextWrapper/AuthContext/AuthContext";

type Props = {};

const ErrorPage = ({}: Props) => {
  //   const { isAuthenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  const goBack = () => {
    if (getValueFromLocalStorage("token")) {
      navigate("/dashboard");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="error-page">
      <div className="error-page_header">
        <h1>Error 404 page not found</h1>
        <button className="btn btn-warning" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;

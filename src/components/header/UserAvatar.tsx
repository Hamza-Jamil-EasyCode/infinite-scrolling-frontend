import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import avatarImage from "../../assets/avatar.png";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { deleteValueFromLocalStorage } from "../helper/helper";

type Props = {};

const UserAvatar = (props: Props) => {
  const navigate = useNavigate();
  const { setIsAuthenticateContext, setUserDataContext } =
    useContext(AuthContext);

  const logout = async () => {
    setIsAuthenticateContext?.(false);
    deleteValueFromLocalStorage("isAuth");
    navigate("/login");
  };

  return (
    <div className="user_avatar dropdown">
      <img
        src={avatarImage}
        alt="avatar-image"
        width="50"
        height="50"
        className="rounded-circle me-2"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <span className="dropdown-item" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" /> Log Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default memo(UserAvatar);

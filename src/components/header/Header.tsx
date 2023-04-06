import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  heading: string;
};

const Header = ({ heading }: Props) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="header_wrapper">
      <div className="row m-0 p-0">
        <div className="col-md-12 p-0 m-0">
          <div className="header_wrapper-heading">
            <div className="header_wrapper-heading__icon">
              <i
                data-test_id="header_test_btn"
                className="fa-solid fa-angle-left"
                onClick={goBack}
              ></i>
            </div>
            <h1 className="title">{heading}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);

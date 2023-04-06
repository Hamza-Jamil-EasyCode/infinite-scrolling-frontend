import React from "react";
import Spacer from "../common/Spacer";
import Header from "../header/Header";
import Sidebar from "../header/Sidebar";

type Props = {
  children: React.ReactNode;
  heading: string;
  isHeadingShow?: boolean;
};

const Layout = ({ children, heading, isHeadingShow = true }: Props) => {
  return (
    <Sidebar>
      {isHeadingShow && <Header heading={heading} />}
      <Spacer />
      {children}
      <Spacer verticalGap={50} />
    </Sidebar>
  );
};

export default Layout;

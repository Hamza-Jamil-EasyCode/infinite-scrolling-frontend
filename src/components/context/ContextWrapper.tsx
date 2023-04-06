import * as React from "react";
import AuthContextWrapper from "./AuthContext/AuthContextWrapper";

type ContextWrapperProps = {
  children: React.ReactNode;
};

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  return <AuthContextWrapper>{children}</AuthContextWrapper>;
};

export default ContextWrapper;

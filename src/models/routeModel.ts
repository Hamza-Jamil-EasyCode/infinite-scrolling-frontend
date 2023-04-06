import { FC } from "react";

export interface RoutesModel {
  path: string;
  isIncludeInSideBar: boolean;
  heading?: string;
  sideBarHeading?: string;
  isProtected: boolean;
  Component: FC;
  icon?: string;
  isHeadingShow?: boolean;
}

export interface RenderRoutesModel {
  path: string;
  element: JSX.Element;
}

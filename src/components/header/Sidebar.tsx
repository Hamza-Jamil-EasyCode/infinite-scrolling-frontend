import { useContext, useEffect, useState } from "react";
import {
  matchPath,
  matchRoutes,
  NavLink,
  useLocation,
  useMatch,
} from "react-router-dom";
import { RoutesModel } from "../../models/routeModel";
import { allRoutes } from "../../routes/routes";
import { AuthContext } from "../context/AuthContext/AuthContext";
import Navbar from "./Navbar";

type ISidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: ISidebarProps) => {
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const mql: MediaQueryList = window.matchMedia(`(min-width: 800px)`);

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(mql.matches);

  const triggerSideBar = (): void => setSideBarOpen(!sideBarOpen);

  const openCloseSideBarHandler = () => {
    const element: HTMLElement = document.getElementById("sideBar")!;
    const element_1: HTMLElement = document.getElementById("sideBarUL")!;
    const element_2: HTMLElement = document.getElementById("sidebarLogo")!;
    const element_3: HTMLElement = document.getElementById("username")!;
    element.style.width = sideBarOpen ? "200px" : "0";
    element.style.padding = sideBarOpen ? "1rem" : "0";
    element_1.style.display = sideBarOpen ? "block" : "none";
    element_2.style.display = sideBarOpen ? "block" : "none";
    element_3.style.display = sideBarOpen ? "block" : "none";
  };

  useEffect(openCloseSideBarHandler, [sideBarOpen]);

  const screenSizeHandler = (): void => setSideBarOpen(mql.matches);

  const matchPathName = () =>
    allRoutes
      .filter((e: RoutesModel) => e.isProtected)
      .find((e: RoutesModel) => matchRoutes([{ path: e.path }], location))
      ?.sideBarHeading;

  useEffect(() => {
    window.addEventListener("resize", screenSizeHandler);
    return () => window.removeEventListener("resize", screenSizeHandler);
  }, []);

  const renderClass = (e: RoutesModel): string =>
    `${
      matchPathName() === e.sideBarHeading ? "navLinkActive" : null
    } nav-link navLinkHover`;

  return (
    <div className="sidebar">
      <main>
        <div className="d-flex">
          <div
            id="sideBar"
            className="d-flex flex-column flex-shrink-0 text-white sidebar-wrapper"
          >
            <NavLink
              to="/cars"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <p id="sidebarLogo" className="fs-4 sidebar-wrapper_logo">
                Infinite Scrolling
              </p>
            </NavLink>
            <ul
              id="sideBarUL"
              className="nav nav-pills flex-column mb-auto mt-5"
            >
              {allRoutes
                .filter(
                  (e: RoutesModel) => e.isProtected && e.isIncludeInSideBar
                )
                .map((e: RoutesModel, i: number) => (
                  <li key={i} className="nav-item">
                    <NavLink
                      to={e.path}
                      className={() => renderClass(e)}
                      aria-current="page"
                    >
                      <i className={`${e.icon} pe-2`}></i>
                      {e.sideBarHeading}
                    </NavLink>
                  </li>
                ))}
            </ul>

            <hr />

            <p id="username" className="username">
              {user.name}
            </p>
          </div>

          <div style={{ width: "100%", height: "100vh", overflowY: "scroll" }}>
            <Navbar triggerSideBar={triggerSideBar} />
            <div className="pt-5 ps-4 pe-4 d-flex flex-column ">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;

import { Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { RenderRoutesModel, RoutesModel } from "./models/routeModel";
import { allRoutes } from "./routes/routes";
import ErrorPage from "./components/Error/ErrorPage";
import { getValueFromLocalStorage } from "./components/helper/helper";
import "./App.scss";
import { AuthContext } from "./components/context/AuthContext/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthenticate } = useContext(AuthContext);

  const renderLayout = (Component: any) => (props: any) =>
    (
      <Layout heading={props?.heading} isHeadingShow={props?.isHeadingShow}>
        <Component {...props} />
      </Layout>
    );

  const normalRoutes = () => {
    const routes: RenderRoutesModel[] = allRoutes
      .filter((e: RoutesModel) => !e.isProtected)
      .map((e: RoutesModel, i) => ({
        path: e.path,
        element: <e.Component />,
      }));

    routes.push({ path: "*", element: <ErrorPage /> });
    return createBrowserRouter(routes.map((e: RenderRoutesModel) => e));
  };

  const protectedRoutes = () => {
    const routes: RenderRoutesModel[] = allRoutes
      .filter((e) => e.isProtected)
      .map((e, i) => ({
        path: e.path,
        element: renderLayout(e.Component)({
          heading: e.heading,
          isHeadingShow: e.isHeadingShow,
        }),
      }));

    routes.push({ path: "*", element: <ErrorPage /> });
    return createBrowserRouter(routes.map((e: RenderRoutesModel) => e));
  };

  const renderLoader = () => <h1>Loader ....</h1>;

  return (
    <div className="app-section">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
        }}
      />

      <Suspense fallback={renderLoader()}>
        <RouterProvider
          router={isAuthenticate ? protectedRoutes() : normalRoutes()}
        />
      </Suspense>
    </div>
  );
}

export default App;

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { PuffLoader } from "react-spinners";
//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import LayoutHome from "../Layouts/home/index";

//routes
import {
  authProtectedRoutes,
  publicRoutes,
  homeRoutes,
  CinemaCornerRoutes,
} from "./allRoutes";
import { AuthProtected } from "./AuthProtected";

const loading = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <PuffLoader color={"#c6ec0c"} loading={true} size={76} />
  </div>
);

const Index = () => {
  return (
    <React.Fragment>
      <Suspense fallback={loading}>
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <NonAuthLayout>
                    {route.element ? route.element : route.component}
                  </NonAuthLayout>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
          {/* home router */}
          <Route>
            {homeRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<LayoutHome>{route.component}</LayoutHome>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>
          {CinemaCornerRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<LayoutHome>{route.component}</LayoutHome>}
              key={idx}
              exact={true}
            />
          ))}
          <Route></Route>

          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <VerticalLayout>
                      {route.element ? route.element : route.component}
                    </VerticalLayout>
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default Index;

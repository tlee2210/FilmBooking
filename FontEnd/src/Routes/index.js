import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { PuffLoader } from "react-spinners";
//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import LayoutHome from "../Layouts/home/index";

//routes
import {
  adminProtectedRoutes,
  publicRoutes,
  homeRoutes,
  AuthRoutes,
} from "./allRoutes";
import { AuthProtected, AdminProtected, AccessRoute } from "./AuthProtected";

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
                  <AccessRoute>
                    <NonAuthLayout>
                      {route.element ? route.element : route.component}
                    </NonAuthLayout>
                  </AccessRoute>
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
                element={
                  <LayoutHome>
                    {route.element ? route.element : route.component}
                  </LayoutHome>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
          <Route>
            {AuthRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <LayoutHome>
                      {route.element ? route.element : route.component}
                    </LayoutHome>
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {adminProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AdminProtected>
                    <VerticalLayout>
                      {route.element ? route.element : route.component}
                    </VerticalLayout>
                  </AdminProtected>
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

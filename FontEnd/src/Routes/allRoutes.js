import React from "react";
import { Navigate } from "react-router-dom";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

import Home from "../pages/home/index";

const authProtectedRoutes = [
  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // {
  //   path: "/",
  //   exact: true,
  //   component: <Navigate to="/profile" />,
  // },
  // { path: "*", component: <Navigate to="/profile" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
];

const homeRoutes = [{ path: "/", component: <Home /> }];

export { authProtectedRoutes, publicRoutes, homeRoutes };

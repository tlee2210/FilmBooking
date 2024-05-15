import React from "react";
import { Navigate } from "react-router-dom";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import VerifyPassword from "../pages/Authentication/verifyPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

import Home from "../pages/home/index";

import Starter from "../pages/dashboard/Starter";

import Celebrity from "../pages/dashboard/Celebrity/index";
import CelebrityCreate from "../pages/dashboard/Celebrity/create";
import CelebrityEdit from "../pages/dashboard/Celebrity/edit";
import City from "../pages/dashboard/city/index";
import CinemaCreate from "../pages/dashboard/Cinemas/create";

const authProtectedRoutes = [
  //User Profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/pages-starter", component: <Starter /> },
  { path: "/dashboard/celebrity", component: <Celebrity /> },
  { path: "/dashboard/celebrity/:slug/edit", component: <CelebrityEdit /> },
  { path: "/dashboard/celebrity/create", component: <CelebrityCreate /> },
  { path: "/dashboard/city", component: <City /> },
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
  { path: "/verify-password/:opt/:id", component: <VerifyPassword /> },
  { path: "/register", component: <Register /> },

  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/dashboard/cinema/create", component: <CinemaCreate /> },
];

const homeRoutes = [{ path: "/", component: <Home /> }];

export { authProtectedRoutes, publicRoutes, homeRoutes };

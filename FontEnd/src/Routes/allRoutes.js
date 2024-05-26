import React from "react";
import { Navigate } from "react-router-dom";
import { lazy } from "react";

// Lazy load components
const Login = lazy(() => import("../pages/Authentication/Login"));
const ForgetPasswordPage = lazy(() =>
  import("../pages/Authentication/ForgetPassword")
);
const VerifyPassword = lazy(() =>
  import("../pages/Authentication/verifyPassword")
);
const Logout = lazy(() => import("../pages/Authentication/Logout"));
const Register = lazy(() => import("../pages/Authentication/Register"));

const Alt404 = lazy(() => import("../pages/AuthenticationInner/Errors/Alt404"));
const Error500 = lazy(() =>
  import("../pages/AuthenticationInner/Errors/Error500")
);

// User Profile
const UserProfile = lazy(() => import("../pages/Authentication/user-profile"));

const Home = lazy(() => import("../pages/home/index"));

const Starter = lazy(() => import("../pages/dashboard/Starter"));

const Celebrity = lazy(() => import("../pages/dashboard/Celebrity/index"));
const CelebrityCreate = lazy(() =>
  import("../pages/dashboard/Celebrity/create")
);
const CelebrityEdit = lazy(() => import("../pages/dashboard/Celebrity/edit"));

const MovieGenre = lazy(() => import("../pages/dashboard/movieGenre/index"));

const CinemaCreate = lazy(() => import("../pages/dashboard/Cinemas/create"));
const CinemaEdit = lazy(() => import("../pages/dashboard/Cinemas/edit"));
const Cinemas = lazy(() => import("../pages/dashboard/Cinemas/index"));

const Movie = lazy(() => import("../pages/dashboard/Movie/index"));
const MovieEdit = lazy(() => import("../pages/dashboard/Movie/edit"));
const MovieCreate = lazy(() => import("../pages/dashboard/Movie/create"));

const CinemaCorners = lazy(() =>
  import("../pages/dashboard/CinemaCorner/index")
);
const DaoDien = lazy(() => import("../pages/dashboard/CinemaCorner/daoDien"));

const authProtectedRoutes = [
  //User Profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/pages-starter", component: <Starter /> },

  { path: "/dashboard/celebrity", component: <Celebrity /> },
  { path: "/dashboard/celebrity/:slug/edit", component: <CelebrityEdit /> },
  { path: "/dashboard/celebrity/create", component: <CelebrityCreate /> },

  { path: "/dashboard/cinema/create", component: <CinemaCreate /> },
  { path: "/dashboard/cinema", component: <Cinemas /> },
  { path: "/dashboard/cinema/:slug/edit", component: <CinemaEdit /> },
  { path: "/dashboard/movie-genre", component: <MovieGenre /> },
  
  { path: "/dashboard/movie", component: <Movie /> },
  { path: "/dashboard/movie/:slug/edit", component: <MovieEdit /> },
  { path: "/dashboard/movie/create", component: <MovieCreate /> },

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
];

const homeRoutes = [{ path: "/", component: <Home /> }];

const CinemaCornerRoutes = [
  { path: "/dien-vien", component: <CinemaCorners /> },
  { path: "/dao-dien", component: <DaoDien /> },
];

export { authProtectedRoutes, publicRoutes, homeRoutes, CinemaCornerRoutes };

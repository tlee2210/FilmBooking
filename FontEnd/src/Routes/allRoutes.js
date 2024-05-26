import React from "react";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
// //login
// import Login from "../pages/Authentication/Login";
// import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
// import VerifyPassword from "../pages/Authentication/verifyPassword";
// import Logout from "../pages/Authentication/Logout";
// import Register from "../pages/Authentication/Register";

// import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
// import Error500 from "../pages/AuthenticationInner/Errors/Error500";

// // User Profile
// import UserProfile from "../pages/Authentication/user-profile";

// import Home from "../pages/home/index";

// import Starter from "../pages/dashboard/Starter";

// import Celebrity from "../pages/dashboard/Celebrity/index";
// import CelebrityCreate from "../pages/dashboard/Celebrity/create";
// import CelebrityEdit from "../pages/dashboard/Celebrity/edit";
// import City from "../pages/dashboard/city/index";
// import CinemaCreate from "../pages/dashboard/Cinemas/create";
// import Cinemas from "../pages/dashboard/Cinemas/index";

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

//Cinema Coner
const Actor = lazy(() =>
  import("../pages/Page/CinemaCorner/Actor")
);
const Director = lazy(() => import("../pages/Page/CinemaCorner/Director"));
const ActorInfor = lazy(()=>import("../pages/Page/CinemaCorner/Details/ActorInfor"))
const DirectorInfor = lazy(()=>import("../pages/Page/CinemaCorner/Details/DirectorInfor"))

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
  { path: "/dien-vien", component: <Actor /> },
  { path: "/dao-dien", component: <Director /> },
  { path: "/dien-vien/dien-vien-details", component: <ActorInfor /> },
  { path: "/dao-dien/dao-dien-details", component: <DirectorInfor /> },
];

export { authProtectedRoutes, publicRoutes, homeRoutes, CinemaCornerRoutes };

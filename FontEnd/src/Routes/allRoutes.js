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

const Room = lazy(() => import("../pages/dashboard/Room/index"));
const RoomCreate = lazy(() => import("../pages/dashboard/Room/create"));
const RoomEdit = lazy(() => import("../pages/dashboard/Room/edit"));

const Movie = lazy(() => import("../pages/dashboard/Movie/index"));
const MovieEdit = lazy(() => import("../pages/dashboard/Movie/edit"));
const MovieCreate = lazy(() => import("../pages/dashboard/Movie/create"));

//Cinema Coner
const Actor = lazy(() => import("../pages/Page/CinemaCorner/Actor"));
const Director = lazy(() => import("../pages/Page/CinemaCorner/Director"));

const ActorInfor = lazy(() =>
  import("../pages/Page/CinemaCorner/Details/ActorInfor")
);
const DirectorInfor = lazy(() =>
  import("../pages/Page/CinemaCorner/Details/DirectorInfor")
);

//Ticket Booking
const TicketBooking = lazy(() => import("../pages/Page/BuyTicket/index"));

//Binh Luận Phim
import BinhLuanPhim from "../pages/Page/BinhLuanPhim/index";
import BinhLuanPhimDetails from "../pages/Page/BinhLuanPhim/details";

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
  { path: "/dashboard/movie/create", component: <MovieCreate /> },

  { path: "/dashboard/room/create", component: <RoomCreate /> },
  { path: "/dashboard/room", component: <Room /> },
  { path: "/dashboard/room/:id/edit", component: <RoomEdit /> },
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

const TicketBookingRoutes = [
  { path: "/ticket-booking/phim", component: <TicketBooking /> },
];

const BinhLuanPhimRoutes = [
  { path: "/binh-luan-phim", component: <BinhLuanPhim /> },
  {
    path: "/binh-luan-phim/binh-luan-phim-details",
    component: <BinhLuanPhimDetails />,
  },
];

export {
  authProtectedRoutes,
  publicRoutes,
  homeRoutes,
  CinemaCornerRoutes,
  TicketBookingRoutes,
  BinhLuanPhimRoutes,
};

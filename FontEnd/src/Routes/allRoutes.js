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
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));

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

const WaterCornCreate = lazy(() =>
  import("../pages/dashboard/WaterCorn/create")
);
const WaterCornEdit = lazy(() => import("../pages/dashboard/WaterCorn/edit"));
const WaterCorn = lazy(() => import("../pages/dashboard/WaterCorn/index"));

const UserManagement = lazy(() => import("../pages/dashboard/User/index"));
const UserCreateManagement = lazy(() =>
  import("../pages/dashboard/User/create")
);
const UserEditManagement = lazy(() => import("../pages/dashboard/User/edit"));

const ShowTimeCreate = lazy(() => import("../pages/dashboard/ShowTime/create"));
const ShowTimeEdit = lazy(() => import("../pages/dashboard/ShowTime/edit"));
const ShowTime = lazy(() => import("../pages/dashboard/ShowTime/index"));

const Blog = lazy(() => import("../pages/dashboard/Blog/index"));
const BlogCreate = lazy(() => import("../pages/dashboard/Blog/create"));
const BlogEdit = lazy(() => import("../pages/dashboard/Blog/edit"));

const Promotion = lazy(() => import("../pages/dashboard/Promotion/index"));
const PromotionEdit = lazy(() => import("../pages/dashboard/Promotion/edit"));
const PromotionCreate = lazy(() =>
  import("../pages/dashboard/Promotion/create")
);

const Review = lazy(() => import("../pages/dashboard/Review/index"));
const ReviewCreate = lazy(() => import("../pages/dashboard/Review/create"));
const ReviewEdit = lazy(() => import("../pages/dashboard/Review/edit"));

const Voucher = lazy(() => import("../pages/dashboard/Voucher/index"));
const VoucherCreate = lazy(() => import("../pages/dashboard/Voucher/create"));
const VoucherEdit = lazy(() => import("../pages/dashboard/Voucher/edit"));

// import Booking from "../pages/dashboard/Booking/index";
const Booking = lazy(() => import("../pages/dashboard/booking/index"));

//home
//Cinema Coner
const Actor = lazy(() => import("../pages/Page/CinemaCorner/Actor"));
const Director = lazy(() => import("../pages/Page/CinemaCorner/Director"));

const CelebrityInfor = lazy(() =>
  import("../pages/Page/CinemaCorner/Details/celebrityInfor")
);

//Ticket Booking
const BookTickets = lazy(() => import("../pages/Page/BuyTicket/index"));

//Binh Luận Phim
import MovieCommentary from "../pages/Page/MovieCommentary/index";
import MovieCommentaryDetails from "../pages/Page/MovieCommentary/details";

//The Loai Phim
import HomeMovieGenre from "../pages/Page/Movie-Genre/index";
import HomeMovieGenreDetails from "../pages/Page/Movie-Genre/Details";

//Rạp Phim
import CinemaHome from "../pages/Page/Cinema/Index";
import BookingHome from "../pages/Page/Booking/index";
//Order
import BlogMovie from "../pages/Page/BlogMovie";
import BlogMovieDetails from "../pages/Page/BlogMovie/details";

import MovieList from "../pages/Page/Movie/index";
const Home = lazy(() => import("../pages/home/index"));

//Event
import PromotionHome from "../pages/Page/Promotion/index";
import PromotionDetailsHome from "../pages/Page/Promotion/Details";

// import PhimHayThang from "../pages/Page/Promotion/PhimHayThang";

// import PhimHayThangDetails from "../pages/Page/Promotion/PhimHayThangDetails";

import Profile from "../pages/Page/Profile";

//dat ve
import DatVeXemPhim from "../pages/Page/Dat-Ve-Xem-Phim";

const adminProtectedRoutes = [
  //User Profile
  // { path: "/dashboard/profile", component: <UserProfile /> },
  { path: "/dashboard", component: <Dashboard /> },

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

  { path: "/dashboard/water-corn/create", component: <WaterCornCreate /> },
  { path: "/dashboard/water-corn/:slug/edit", component: <WaterCornEdit /> },
  { path: "/dashboard/water-corn", component: <WaterCorn /> },

  { path: "/dashboard/users", component: <UserManagement /> },
  { path: "/dashboard/users/create", component: <UserCreateManagement /> },
  { path: "/dashboard/users/:id/edit", component: <UserEditManagement /> },

  { path: "/dashboard/show-time/create", component: <ShowTimeCreate /> },
  { path: "/dashboard/show-time/:id/edit", component: <ShowTimeEdit /> },
  { path: "/dashboard/show-time", component: <ShowTime /> },

  { path: "/dashboard/blog", component: <Blog /> },
  { path: "/dashboard/blog/create", component: <BlogCreate /> },
  { path: "/dashboard/blog/:slug/edit", component: <BlogEdit /> },

  { path: "/dashboard/review", component: <Review /> },
  { path: "/dashboard/review/create", component: <ReviewCreate /> },
  { path: "/dashboard/review/:slug/edit", component: <ReviewEdit /> },

  { path: "/dashboard/promotion", component: <Promotion /> },
  { path: "/dashboard/promotion/create", component: <PromotionCreate /> },
  { path: "/dashboard/promotion/:slug/edit", component: <PromotionEdit /> },

  { path: "/dashboard/voucher", component: <Voucher /> },
  { path: "/dashboard/voucher/create", component: <VoucherCreate /> },
  { path: "/dashboard/voucher/:id/edit", component: <VoucherEdit /> },

  { path: "/dashboard/booking", component: <Booking /> },

  // VoucherCreate
  // Voucher
  // VoucherEdit

  // Promotion
  // /dashboard/promotion

  // /dashboard/blog/create
  // {
  //   path: "/",
  //   exact: true,
  //   component: <Navigate to="/profile" />,
  // },
  // { path: "*", component: <Navigate to="/profile" /> },
];
// authProtectedRoutes

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/verify-password/:opt/:id", component: <VerifyPassword /> },
];

const homeRoutes = [
  { path: "/", component: <Home /> },

  // actor page
  { path: "/actor", component: <Actor /> },
  { path: "/actor/:slug/details", component: <CelebrityInfor /> },

  // director page
  { path: "/director", component: <Director /> },
  { path: "/director/:slug/details", component: <CelebrityInfor /> },

  // blog page
  { path: "/blog-movie", component: <BlogMovie /> },
  {
    path: "/blog-movie/:slug/details",
    component: <BlogMovieDetails />,
  },
  // movie commentary page
  { path: "/movie-commentary", component: <MovieCommentary /> },
  {
    path: "/movie-commentary/:slug/details",
    component: <MovieCommentaryDetails />,
  },

  { path: "/book-tickets/:slug", component: <BookTickets /> },
  { path: "/movie-showing", component: <MovieList /> },

  { path: "/cinema/:slug", component: <CinemaHome /> },

  { path: "/movie-genre", component: <HomeMovieGenre /> },

  { path: "/movie/:slug/details", component: <HomeMovieGenreDetails /> },

  { path: "/promotion", component: <PromotionHome /> },
  { path: "/promotion/:slug/details", component: <PromotionDetailsHome /> },

  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  //------------------------------------------
  { path: "*", component: <Navigate to="/" /> },

  //đặt vế
  { path: "/dat-ve", component: <DatVeXemPhim /> },
  //event
  // { path: "/phim-hay-thang", component: <PhimHayThang /> },
  // { path: "/phim-hay-thang/details", component: <PhimHayThangDetails /> },
];

const AuthRoutes = [
  //Profile
  { path: "/profile", component: <Profile /> },
  { path: "/booking", component: <BookingHome /> },
];

export { adminProtectedRoutes, publicRoutes, homeRoutes, AuthRoutes };

import {
  fetchSuccess,
  fetchHomeData,
  setSelectOption,
  setMovieDetails,
  fetchNavbarData,
} from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";
// getMovieActiveLimitIntroduce
// http://localhost:8081/api/home/movie/v1/active/introduce

export const getHomepage = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/home/v1`)
    .then((response) => {
      console.log(response);
      dispatch(fetchHomeData({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

export const getMovieActiveLimitIntroduce = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/movie/v1/active/introduce`)
    .then((response) => {
      // console.log(response);
      dispatch(fetchSuccess(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

export const getMovieDetailsBook = (slug) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/movie/v1/detail/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(setMovieDetails(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};
export const getAllMovie = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/movie/v1`)
    .then((response) => {
      // console.log(response);
      dispatch(fetchHomeData({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};
export const getNavbar = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/home/v1/navbar`)
    .then((response) => {
      // console.log(response);
      dispatch(fetchNavbarData({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

import {
  fetchSuccess,
  fetchSuccessReview,
  setSelectOption,
  removeItem,
  setItem,
} from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";

// http://localhost:8081/api/home/v1/celebrity/actor?pageNo=1&pageSize=15&sort=ASC
export const getHomeBlog = (pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/blog`, {
      params: { pageNo, pageSize },
    })
    .then((response) => {
      console.log(response);
      dispatch(fetchSuccess({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
    });
};

export const getBlogDetails = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/blog/detail/${slug}`)
    .then((response) => {
      console.log(response);
      dispatch(setItem({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
      if (error.response?.status === 404) {
        history("/");
      }
    });
};

export const getHomeReview = (type, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/review`, {
      params: { type, pageNo, pageSize },
    })
    .then((response) => {
      console.log(response);
      dispatch(fetchSuccessReview({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
    });
};

export const getHomeReviewDetails = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/review/${slug}/detail`)
    .then((response) => {
      console.log(response);
      dispatch(setItem({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
      if (error.response?.status === 404) {
        history("/");
      }
    });
};

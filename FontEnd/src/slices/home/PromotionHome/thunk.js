import { fetchSuccess, setItem } from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getHomePromotion = (pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/promotion/v1`, {
      params: { pageNo, pageSize },
    })
    .then((response) => {
      // console.log(response);
      dispatch(fetchSuccess({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
    });
};
export const getHomePromotionDetails = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/promotion/v1/detail/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(setItem({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error.response?.data?.message));
    });
};

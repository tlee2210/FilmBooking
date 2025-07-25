import { fetchSuccess, setSelectOption, removeItem, setItem } from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";

// http://localhost:8081/api/home/celebrity/v1/actor?pageNo=1&pageSize=15&sort=ASC
export const getHomeActor =
  (slugCountry, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/home/celebrity/v1/actor`, {
        params: { slugCountry, pageNo, pageSize },
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

export const getcelebrityDetails = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/celebrity/v1/detail/${slug}`)
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

export const getHomedirector =
  (slugCountry, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/home/celebrity/v1/director`, {
        params: { slugCountry, pageNo, pageSize },
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

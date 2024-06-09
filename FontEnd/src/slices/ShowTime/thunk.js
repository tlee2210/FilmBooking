import { setMovieAndCinema, setMovieItem, setRoomItem } from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getMovieAndCinema = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/show-time/create`)
    .then((response) => {
      console.log(response);
      dispatch(setMovieAndCinema(response?.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

// http://localhost:8081/api/admin/v1/cinema/2

export const getRoomForShowTime = (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/room/${id}`)
    .then((response) => {
      console.log(response);
      dispatch(setRoomItem(response?.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

export const getMovieForShowTime = (id) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie/${id}`)
    .then((response) => {
      console.log(response);
      dispatch(setMovieItem(response?.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

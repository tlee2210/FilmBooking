import {
  setMovieAndCinema,
  setMovieItem,
  setRoomItem,
  fetchSuccess,
  setShowTime,
} from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getShowTime =
  (cinema, startDay, endDay, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/admin/v1/show-time`, {
        params: { cinema, startDay, endDay, pageNo, pageSize },
      })
      .then((response) => {
        // console.log(response);
        dispatch(fetchSuccess({ data: response?.data?.result }));
      })
      .catch((err) => {
        console.error(err);
        // dispatch(Error(err.response.data?.message));
      });
  };

export const getMovieAndCinema = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/show-time/create`)
    .then((response) => {
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
      dispatch(setMovieItem(response?.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

export const createShowTime = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/show-time/create`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      history("/dashboard/show-time");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const deleteShowTime = (id) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/show-time/${id}/delete`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      dispatch(getShowTime());

      // history("/dashboard/show-time");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const getShowTimeEdit = (id, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/show-time/${id}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(setShowTime(response?.data?.result));
      // history("/dashboard/show-time");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/show-time");
      }
    });
};
export const updateShowTimeEdit = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/show-time/update`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      history("/dashboard/show-time");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
      // if (err.response?.status === 404) {
      //   history("/dashboard/show-time");
      // }
    });
};

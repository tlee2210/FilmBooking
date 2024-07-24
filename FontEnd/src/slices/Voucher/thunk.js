import {
  setMovieAndCinema,
  setMovieItem,
  setRoomItem,
  fetchSuccess,
  setItem,
} from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getVoucher = (pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/voucher/v1`, {
      params: { pageNo, pageSize },
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

export const createVoucher = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/voucher/v1/create`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      history("/dashboard/voucher");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const deleteVoucher = (id) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/voucher/v1/delete/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      dispatch(getVoucher());
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const getVoucherEdit = (id, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/voucher/v1/${id}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(setItem(response?.data?.result));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/voucher");
      }
    });
};
export const updateVoucher = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/voucher/v1/update`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response?.data?.message));
      history("/dashboard/voucher");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/voucher");
      }
    });
};

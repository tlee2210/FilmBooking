import { getDate, getCityitem } from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getcity = (formData) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/city`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(getDate(response.data.result));
    })
    .catch((err) => {
      // console.error(err);
      // dispatch(Error(err.response.data.message));
    });
};

export const CreateCity = (formData) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/city/create`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data.message));
      dispatch(getcity({}));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

export const deleteCity = (id) => async (dispatch) => {
  console.log("id : " + id);
  await axios
    .delete(`http://localhost:8081/api/admin/v1/city/delete/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(getcity({}));
      dispatch(Success(response.data.message));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

export const GetEditCity = (id, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/city/${id}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(getCityitem(response.data.result));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

export const UpdateCity = (formData) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/city/update`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data.message));
      dispatch(getcity({}));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

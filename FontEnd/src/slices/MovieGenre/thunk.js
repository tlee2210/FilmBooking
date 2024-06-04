import { getDate, getitem } from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getMovieGenre = (search, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie-genre`, {
      params: { search, pageNo, pageSize },
    })
    .then((response) => {
      // console.log(response);
      dispatch(getDate(response.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

export const CreateMovieGenre = (formData) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/movie-genre/create`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getMovieGenre({}));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const deleteMovieGenre = (slug) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/movie-genre/${slug}/delete`)
    .then((response) => {
      // console.log(response);
      dispatch(getMovieGenre({}));
      dispatch(Success(response.data?.message));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const GetEditMovieGenre = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie-genre/${slug}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(getitem(response.data?.result));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const UpdateMovieGenre = (formData) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/movie-genre/update`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getMovieGenre({}));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

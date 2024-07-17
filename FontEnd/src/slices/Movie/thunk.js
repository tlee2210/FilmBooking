import { fetchSuccess, setSelectOption, removeItem, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getMovie =
  (name, status, countryId, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/admin/v1/movie`, {
        params: { name, status, countryId, pageNo, pageSize },
      })
      .then((response) => {
        // console.log(response);
        dispatch(
          fetchSuccess({
            data: response.data?.result,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        // dispatch(Error(err.response?.data?.message));
      });
  };

export const getCreate = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie/create`)
    .then((response) => {
      // console.log(response);
      dispatch(
        setSelectOption({
          data: response.data?.result,
        })
      );
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response?.data?.message));
    });
};

export const CreateMovies = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/movie/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/Movie");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deleteMovie = (slug) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/movie/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getMovie({}));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const GetEditMovie = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie/${slug}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(
        setItem({
          data: response.data?.result,
        })
      );
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/movie");
      }
    });
};

export const UpdateMovie = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/movie/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/movie");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data.message));
    });
};

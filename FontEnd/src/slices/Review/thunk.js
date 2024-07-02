// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess, setSelectOption, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getReview = (name, type, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/review`, {
      params: { name, type, pageNo, pageSize },
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
      console.log(err);
    });
};

export const getCreateReview = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/review/create`)
    .then((response) => {
      // console.log(response);
      dispatch(setSelectOption({ data: response.data?.result }));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

export const CreateReview = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/review/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/review");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deleteReview = (slug, history) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/review/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getReview());
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const editReview = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/review/${slug}/edit`)
    .then((response) => {
      console.log(response);
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
        history("/dashboard/review");
      }
    });
};

export const updateReview = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/review/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/review");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

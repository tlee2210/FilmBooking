// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getPromotion = (name, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/promotion/v1`, {
      params: { name, pageNo, pageSize },
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

export const CreatePromotion = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/promotion/v1/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/promotion");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deletePromotion = (slug, history) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/promotion/v1/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getPromotion());
      // dispatch(removeItem(response.data?.result));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const editPromotion = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/promotion/v1/${slug}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(
        setItem({
          data: response.data?.result,
        })
      );
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/promotion");
      }
    });
};

export const updatePromotion = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/promotion/v1/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/promotion");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

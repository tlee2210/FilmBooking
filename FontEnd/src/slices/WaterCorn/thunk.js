import { fetchSuccess, removeItem, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getWaterCorn = (search, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/watercorn/v1`, {
      params: { search, pageNo, pageSize },
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
      dispatch(Error(err.response?.data?.message));
    });
};

export const CreateWaterCorn = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/watercorn/v1/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/water-corn");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deleteWaterCorn = (slug) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/watercorn/v1/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getWaterCorn({}));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const GetEditWaterCorn = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/watercorn/v1/${slug}/edit`)
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
        history("/dashboard/water-corn");
      }
    });
};

export const UpdateWaterCorn = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/watercorn/v1/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/water-corn");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
      // history("/dashboard/celebrity");
    });
};

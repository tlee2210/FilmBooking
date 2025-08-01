import { fetchSuccess, setSelectOption, removeItem, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getCinema =
  (search, status, city, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/admin/cinema/v1/cinemas`, {
        params: { search, status, city, pageNo, pageSize },
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

export const CreateCinemas = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/cinema/v1/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/cinema");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deleteCinema = (slug) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/cinema/v1/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getCinema({}));
      // dispatch(removeItem(response.data?.result));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const GetEditCinema = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/cinema/v1/${slug}/edit`)
    .then((response) => {
      // console.log(response);
      // dispatch(setSelectOption(response.data?.result.selectOptionReponse));
      dispatch(setItem(response.data?.result));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/cinema");
      }
    });
};

export const UpdateCinema = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/cinema/v1/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/cinema");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
      // history("/dashboard/celebrity");
    });
};

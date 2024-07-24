import { fetchSuccess } from "./reducer";
import { Success, Error } from "../../message/reducer";
import axios from "axios";

export const getprofile = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/user/v1/profile`)
    .then((response) => {
      // console.log(response);
      dispatch(fetchSuccess({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

// http://localhost:8081/api/home/user/v1/update
export const UpdateProfile = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/home/user/v1/update`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getprofile());
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data.message));
    });
};

export const changePassword = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/home/user/v1/change-password`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
      dispatch(Error(error?.response?.data.message));
    });
};

export const uploadAvatar = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/home/user/v1/upload-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getprofile());
    })
    .catch((error) => {
      console.log(error);
      dispatch(Error(error?.response?.data.message));
    });
};

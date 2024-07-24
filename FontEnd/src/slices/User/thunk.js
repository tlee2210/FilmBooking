import { getData, getitem } from "./reducer";
import { Success, Error } from "../message/reducer";

import axios from "axios";

export const getUsers = (name, role, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/user/v1`, {
      params: { name, role, pageNo, pageSize },
    })
    .then((response) => {
      // console.log(response);
      dispatch(getData(response?.data?.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data?.message));
    });
};

export const CreateUsers = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/user/v1/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/users");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const GetEditUser = (id, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/user/v1/${id}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(getitem(response.data?.result));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data?.message));
      history("/dashboard/users");
    });
};

export const UpdateUser = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/user/v1/update`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/users");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

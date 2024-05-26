// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess, setSelectOption, removeItem, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const celebrity =
  (search, role, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/admin/v1/celebrity`, {
        params: { search, role, pageNo, pageSize },
      })
      .then((response) => {
        // console.log(response);
        dispatch(
          fetchSuccess({
            data: response.data.result,
          })
        );
      })
      .catch((err) => {
        console.error(err);
        // dispatch(Error(err.response.data.message));
      });
  };

export const getCreateCelebrity = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/celebrity/create`)
    .then((response) => {
      // console.log(response);
      dispatch(setSelectOption(response.data.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data.message));
    });
};

export const CreateCelebrity = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/celebrity/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data.message));
      history("/dashboard/celebrity");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
      // history("/dashboard/celebrity");
    });
};

export const deleteCelebrity = (id, history) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/celebrity/delete/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data.message));
      dispatch(removeItem(response.data.result));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

export const GetEditCelebrity = (id, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/celebrity/${id}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(setSelectOption(response.data.result.selectOptionReponse));
      dispatch(setItem(response.data.result.model));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
      if (err.response.status) history("/dashboard/celebrity");
    });
};

export const UpdateCelebrity = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/celebrity/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data.message));
      history("/dashboard/celebrity");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data.message));
      // history("/dashboard/celebrity");
    });
};

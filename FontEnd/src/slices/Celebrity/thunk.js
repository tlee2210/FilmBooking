// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess, setSelectOption, removeItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const celebrity = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/celebrity`, formData)
    .then((response) => {
      console.log(response);
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
    .get(`http://localhost:8081/api/celebrity/create`)
    .then((response) => {
      console.log(response);
      dispatch(setSelectOption(response.data.result));
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data.message));
    });
};

export const CreateCelebrity = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/celebrity/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      dispatch(Success(response.data.message));
      history("/dashboard/celebrity");
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data.message));
      history("/dashboard/celebrity");
    });
};

export const deleteCelebrity = (id, history) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/celebrity/delete/${id}`)
    .then((response) => {
      console.log(response);
      dispatch(Success(response.data.message));
      dispatch(removeItem(response.data.result));
    })
    .catch((err) => {
      console.error(err);
      dispatch(Error(err.response.data.message));
    });
};

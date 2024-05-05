// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const celebrity = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/celebrity`, formData)
    .then((response) => {
      console.log(response);
      dispatch(
        fetchSuccess({
          data: response.data.result.content,
          totalPages: response.data.result.totalPages,
          pageNumber: response.data.result.pageable.pageNumber,
          totalElements: response.data.result.totalElements,
        })
      );
    })
    .catch((err) => {
      console.error(err);
      // dispatch(Error(err.response.data.message));
    });
};

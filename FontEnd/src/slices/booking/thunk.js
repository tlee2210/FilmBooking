// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const Booking =
  (userName, movieName, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/admin/booking/v1`, {
        params: { userName, movieName, pageNo, pageSize },
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
        // dispatch(Error(err.response.data?.message));
      });
  };

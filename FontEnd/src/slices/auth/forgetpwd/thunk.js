// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { Success, Error } from "../../message/reducer";
import axios from "axios";

export const ForgetPassword = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/auth/verifyMail`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/login");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const GetverifyOtp = (id, otp, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/auth/verifyOtp/${otp}/${id}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
    })
    .catch((error) => {
      // console.error(error);
      dispatch(Error(error.response.data?.message));
    });
};

export const ResetPassword = (id, formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/auth/changePassword/${id}`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    })
    .finally(() => {
      history("/login");
    });
};

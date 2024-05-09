// action
import axios from "axios";
import {
  registerSuccessful,
  registerFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} from "./reducer";

export const registerUser = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/auth/signup`, formData)
    .then((res) => {
      // console.log(res);
      dispatch(registerSuccessful(res.data.message));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(registerFailed(err.response.data.message));
    });
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange();
    return response;
  } catch (error) {
    return error;
  }
};

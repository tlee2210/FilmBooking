//Include Both Helper File with needed methods

import axios from "axios";
import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

export const loginUser = (user, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/auth/signin`, user)
    .then((res) => {
      console.log(res);
      // const { token, user: userLogin } = res.data;
      // sessionStorage.setItem("authUser", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");
    // let fireBaseBackend = getFirebaseBackend();
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = fireBaseBackend.logout;
    //   dispatch(logoutUserSuccess(response));
    // } else {
    //   dispatch(logoutUserSuccess(true));
    // }
  } catch (error) {
    console.log(error);
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

//Include Both Helper File with needed methods

import axios from "axios";
import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import { Success, Error } from "../../message/reducer";

export const loginUser = (user, history) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("http://localhost:8081/api/auth/signin", user)
      .then((res) => {
        console.log(res);
        const { token, user: userLogin } = res.data.result;
        const tokenObj = { accessToken: token };
        const validUserObj = { ...userLogin, ...tokenObj };
        sessionStorage.setItem("authUser", JSON.stringify(res.data.result));
        // dispatch(loginSuccess(res.data.result.user));
        history("/pages-starter");
        resolve([200, validUserObj]);
      })
      .catch((err) => {
        console.error(err);
        dispatch(Error(err.response.data.message));
      });
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

import axios from "axios";
import { api } from "../config";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(sessionStorage.getItem("authUser"))
  ? JSON.parse(sessionStorage.getItem("authUser")).token
  : null;
if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    // return response.data ? response.data : response;
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response?.status) {
      case 500:
        message = "Internal Server Error";
        // sessionStorage.removeItem("authUser");
        break;
      case 401:
        message = "Invalid credentials";
        sessionStorage.removeItem("authUser");
        window.location.href = "/";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        // message = error.message || error;
        message = error;
        if (message.message === "Network Error") {
          sessionStorage.removeItem("authUser");
        }
        break;
    }
    return Promise.reject(error);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

// class APIClient {
//   /**
//    * Fetches data from given url
//    */

//   //  get = (url, params) => {
//   //   return axios.get(url, params);
//   // };
//   get = (url, params) => {
//     let response;

//     let paramKeys = [];

//     if (params) {
//       Object.keys(params).map((key) => {
//         paramKeys.push(key + "=" + params[key]);
//         return paramKeys;
//       });

//       const queryString =
//         paramKeys && paramKeys.length ? paramKeys.join("&") : "";
//       response = axios.get(`${url}?${queryString}`, params);
//     } else {
//       response = axios.get(`${url}`, params);
//     }

//     return response;
//   };
//   /**
//    * post given data to url
//    */
//   create = (url, data) => {
//     return axios.post(url, data);
//   };
//   /**
//    * Updates data
//    */
//   update = (url, data) => {
//     return axios.patch(url, data);
//   };

//   put = (url, data) => {
//     return axios.put(url, data);
//   };
//   /**
//    * Delete
//    */
//   delete = (url, config) => {
//     return axios.delete(url, { ...config });
//   };
// }
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { setAuthorization, getLoggedinUser };
// export { APIClient, setAuthorization, getLoggedinUser };

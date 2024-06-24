import { fetchSuccess, setSelectOption } from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";
// getMovieActiveLimitIntroduce
// http://localhost:8081/api/home/v1/movie/active/introduce

export const getMovieActiveLimitIntroduce = () => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/movie/active/introduce`)
    .then((response) => {
      console.log(response);
      dispatch(fetchSuccess(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

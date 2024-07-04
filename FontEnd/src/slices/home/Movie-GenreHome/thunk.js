import { fetchSuccess, setDetail } from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getHomeMovieGenre =
  (category, country, status, years, pageNo, pageSize) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/home/v1/movie-genre`, {
        params: { category, country, status, years, pageNo, pageSize },
      })
      .then((response) => {
        // console.log(response);
        dispatch(fetchSuccess({ data: response?.data?.result }));
      })
      .catch((error) => {
        console.log(error);
        // dispatch(Error(error));
      });
  };
export const getMovieGenreDetail = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/movie-genre/detail/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(setDetail(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(Error(error));
    });
};

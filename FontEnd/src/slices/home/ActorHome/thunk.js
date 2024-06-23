import { fetchSuccess, setSelectOption, removeItem, setItem } from "./reducer";
// import { Success, Error } from "../message/reducer";
import axios from "axios";

// http://localhost:8081/api/home/v1/celebrity/actor?pageNo=1&pageSize=15&sort=ASC
export const getHomeActor = (pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/celebrity/actor`, {
      params: { pageNo, pageSize },
    })
    .then((response) => {
      console.log(response);
      dispatch(fetchSuccess({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.log(error);
      dispatch(Error(error.response.data.message));
    });
};

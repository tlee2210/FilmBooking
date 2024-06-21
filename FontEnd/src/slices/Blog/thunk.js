// import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";
import { fetchSuccess, setItem } from "./reducer";
import { Success, Error } from "../message/reducer";
import axios from "axios";

export const getBlog = (name, pageNo, pageSize) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie-blog`, {
      params: { name, pageNo, pageSize },
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
      console.log(err);
    });
};

export const CreateBlog = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/admin/v1/movie-blog/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/blog");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

export const deleteBlog = (slug, history) => async (dispatch) => {
  await axios
    .delete(`http://localhost:8081/api/admin/v1/movie-blog/delete/${slug}`)
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      dispatch(getBlog());
      // dispatch(removeItem(response.data?.result));
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response.data?.message));
    });
};

export const editBlog = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/admin/v1/movie-blog/${slug}/edit`)
    .then((response) => {
      // console.log(response);
      dispatch(
        setItem({
          data: response.data?.result,
        })
      );
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
      if (err.response?.status === 404) {
        history("/dashboard/blog");
      }
    });
};

export const updateBlog = (formData, history) => async (dispatch) => {
  await axios
    .put(`http://localhost:8081/api/admin/v1/movie-blog/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log(response);
      dispatch(Success(response.data?.message));
      history("/dashboard/blog");
    })
    .catch((err) => {
      // console.error(err);
      dispatch(Error(err.response?.data?.message));
    });
};

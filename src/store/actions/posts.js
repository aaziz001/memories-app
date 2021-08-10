import axios from "axios";
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_ALL,
  LIKE_POST,
  UPDATE_POST,
} from "../actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://memories-app-api1.herokuapp.com/posts"
    );
    dispatch({
      type: FETCH_ALL,
      payload: {
        posts: data,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://memories-app-api1.herokuapp.com/posts",
      post
    );
    dispatch({ type: CREATE_POST, payload: { post: data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `https://memories-app-api1.herokuapp.com/posts/${id}`,
      post
    );
    dispatch({ type: UPDATE_POST, payload: { post: data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://memories-app-api1.herokuapp.com/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: { id } });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data: updatedPost } = await axios.patch(
      `https://memories-app-api1.herokuapp.com/posts/${id}/likePost`
    );
    dispatch({ type: LIKE_POST, payload: { id, post: updatedPost } });
  } catch (error) {
    console.log(error.message);
  }
};

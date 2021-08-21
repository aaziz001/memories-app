import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  LOGOUT,
} from "../actionTypes";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload.posts;
    case CREATE_POST:
      return [...state, action.payload.post];
    case UPDATE_POST:
      return state.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    case DELETE_POST:
      return state.filter((post) => action.payload.id !== post._id);
    case LIKE_POST:
      return state.map((post) =>
        post._id === action.payload.id ? action.payload.post : post
      );
    case LOGOUT:
      return state.filter((post) => !post.private);
    default:
      return state;
  }
};

export default postsReducer;

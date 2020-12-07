import { apiCall } from "../../services/api";
import { LOAD_FAVORITES, REMOVE_FAVORITE } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  favorites,
});

export const removeFavorite = (id) => ({
  type: REMOVE_FAVORITE,
  id,
});

export const fetchFavorites = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/favorite`)
      .then((res) => {
        dispatch(loadFavorites(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postFavorite = (user_id, product_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/${user_id}/favorite/${product_id}`)
      .then((res) => {
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const removeAFavorite = (user_id, favorite_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/v1/${user_id}/favorite/${favorite_id}`)
      .then((res) => dispatch(removeFavorite(favorite_id)))
      .catch((err) => dispatch(addError(err.message)));
  };
};

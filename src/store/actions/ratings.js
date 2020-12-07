import { apiCall } from "../../services/api";
import { LOAD_RATINGS, REMOVE_RATING } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadRatings = (ratings) => ({
  type: LOAD_RATINGS,
  ratings,
});

export const removeRating = (id) => ({
  type: REMOVE_RATING,
  id,
});

export const fetchRatings = (user_id, product_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/${product_id}/rating`)
      .then((res) => {
        dispatch(loadRatings(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchUnRatedOrders = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/product_id/rating/rate`)
      .then((res) => {
        dispatch(loadRatings(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchUnRatedOrdersCount = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/product_id/rating/count`)
      .then((res) => {
        dispatch(loadRatings(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postRating = (data, user_id, product_id, order_id) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "post",
      `/api/v1/${user_id}/${product_id}/rating/${order_id}`,
      data
    )
      .then((res) => {
        dispatch(removeError());
        dispatch(removeRating(order_id));
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

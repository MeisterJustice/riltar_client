import { apiCall } from "../../services/api";
import { LOAD_VIEWS } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadViews = (views) => ({
  type: LOAD_VIEWS,
  views,
});

export const fetchAllViews = () => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/view`)
      .then((res) => {
        dispatch(loadViews(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchAllViewsForUser = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/view/${user_id}`)
      .then((res) => {
        dispatch(loadViews(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchAllViewsForAUserProduct = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/view/${user_id}/product`)
      .then((res) => {
        dispatch(loadViews(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchLimitedViews = (user_id, limit) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/view/${user_id}/${limit}`)
      .then((res) => {
        dispatch(loadViews(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

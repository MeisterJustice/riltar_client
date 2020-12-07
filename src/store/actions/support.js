import { apiCall } from "../../services/api";
import { LOAD_SUPPORT, UPDATE_SUPPORT } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadSupport = (support) => ({
  type: LOAD_SUPPORT,
  support,
});

export const updateSupport = (id, support) => ({
  type: UPDATE_SUPPORT,
  id,
  support,
});

export const fetchAllSupport = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/support`)
      .then((res) => {
        dispatch(loadSupport(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchAllSupportForAUser = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/support/user`)
      .then((res) => {
        dispatch(loadSupport(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchAllUnrespondedSupport = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/support/responded`)
      .then((res) => {
        dispatch(loadSupport(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postSupport = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/${user_id}/support/user`, data)
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

export const respondSupport = (data, user_id, support_id, customer_id) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "put",
      `/api/v1/${user_id}/${support_id}/${customer_id}/respond`,
      data
    )
      .then((res) => {
        dispatch(updateSupport(support_id, res));
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

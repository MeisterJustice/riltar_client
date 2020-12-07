import { apiCall, setTokenHeader } from "../../services/api";
import {
  SET_CURRENT_USER,
  LOAD_USER,
  LOAD_ADDRESS,
  UPDATE_ADDRESS,
  ADD_ADDRESS,
} from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export const loadAddress = (address) => ({
  type: LOAD_ADDRESS,
  address,
});

export const addAddress = (address) => ({
  type: ADD_ADDRESS,
  address,
});

export const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});

export const updateAddress = (id, address) => ({
  type: UPDATE_ADDRESS,
  id,
  address,
});

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/v1/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export const fetchUser = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/user/${user_id}`)
      .then((res) => {
        dispatch(loadUser(res));
        dispatch(loadAddress(res.location));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const changePassword = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/password`, data)
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

export const addUserAddress = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/address`, data)
      .then((res) => {
        dispatch(addAddress(res));
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const updateAddressInfo = (data, user_id, id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/address/update`, data)
      .then((res) => {
        dispatch(updateAddress(id, res));
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const updateBank = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/bank`, data)
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

export const updateUserDetails = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/details`, data)
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

export const removeUser = (user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/user/${user_id}/remove`)
      .then(() => {
        dispatch(removeError());
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

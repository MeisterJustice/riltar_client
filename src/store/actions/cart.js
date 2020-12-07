import { apiCall } from "../../services/api";
import {
  LOAD_CART,
  LOAD_CART_ITEM,
  REMOVE_CART,
  UPDATE_CART,
  ADD_CART,
} from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadCart = (cart) => ({
  type: LOAD_CART,
  cart,
});

export const loadCartItem = (cart) => ({
  type: LOAD_CART_ITEM,
  cart,
});

export const addCart = (cart) => ({
  type: ADD_CART,
  cart,
});

export const updateCart = (id, cart) => ({
  type: UPDATE_CART,
  id,
  cart,
});

export const removeCart = (id) => ({
  type: REMOVE_CART,
  id,
});

export const fetchCart = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/cart`)
      .then((res) => {
        dispatch(loadCart(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchCartItem = (user_id, cart_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/cart/${cart_id}`)
      .then((res) => {
        dispatch(loadCartItem(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postCart = (data, user_id, product_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/${user_id}/cart/${product_id}`, data)
      .then((res) => {
        dispatch(addCart(res));
        dispatch(loadCartItem(res));
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const updateCartItem = (data, user_id, cart_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/${user_id}/cart/${cart_id}`, data)
      .then((res) => {
        dispatch(updateCart(cart_id, res));
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const removeACart = (user_id, cart_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/v1/${user_id}/cart/${cart_id}`)
      .then(() => dispatch(removeCart(cart_id)))
      .catch((err) => dispatch(addError(err.message)));
  };
};

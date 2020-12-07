import { apiCall } from "../../services/api";
import { LOAD_ORDERS, LOAD_SELLS } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadOrders = (orders) => ({
  type: LOAD_ORDERS,
  orders,
});

export const loadSells = (sells) => ({
  type: LOAD_SELLS,
  sells,
});

export const fetchAllOrders = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/admin/order`)
      .then((res) => {
        dispatch(loadOrders(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchOrders = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/order`)
      .then((res) => {
        dispatch(loadOrders(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchSells = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/order/sell`)
      .then((res) => {
        dispatch(loadSells(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchUndeliveredSellsCount = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/${user_id}/order/count`)
      .then((res) => {
        dispatch(loadSells(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postOrder = (data, user_id, product_id, cart_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "post",
      `/api/v1/${user_id}/order/${cart_id}/${product_id}`,
      data
    )
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

export const confirmOrder = (data, user_id, order_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/${user_id}/order/${order_id}/confirm`, data)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const cancelOrder = (data, user_id, order_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/${user_id}/order/${order_id}/cancel`, data)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

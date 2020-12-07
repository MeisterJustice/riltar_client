import { apiCall } from "../../services/api";
import {
  LOAD_MESSAGE,
  LOAD_MESSAGES,
  ADD_MESSAGES,
  LOAD_ROOM,
  LOAD_ROOMS,
} from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadRooms = (room) => ({
  type: LOAD_ROOMS,
  room,
});

export const loadRoom = (room) => ({
  type: LOAD_ROOM,
  room,
});

export const loadMessages = (message) => ({
  type: LOAD_MESSAGES,
  message,
});

export const loadMessage = (message) => ({
  type: LOAD_MESSAGE,
  message,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGES,
  message,
});

export const fetchRooms = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/message/${user_id}/room`)
      .then((res) => {
        dispatch(loadRooms(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchLastRooms = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/message/${user_id}/room/last`)
      .then((res) => {
        dispatch(loadRooms(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchRoom = (user_id, room_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/message/${user_id}/room/${room_id}`)
      .then((res) => {
        dispatch(loadRoom(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchMessages = (user_id, room_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/message/${user_id}/history/${room_id}`)
      .then((res) => {
        dispatch(loadMessages(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postRoom = (data, user_id, product_id, seller_id) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "post",
      `/api/v1/message/${user_id}/room/${seller_id}/${product_id}`,
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

export const replyMessage = (data, user_id, room_id, recepient_id) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "post",
      `/api/v1/message/${user_id}/history/${room_id}/${recepient_id}`,
      data
    )
      .then((res) => {
        dispatch(addMessage(res));
        dispatch(removeError());
        resolve(res);
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

import { apiCall } from "../../services/api";
import { LOAD_PAYOUTS } from "../actionTypes";
import { addError } from "./errors";

export const loadPayouts = (payouts) => ({
  type: LOAD_PAYOUTS,
  payouts,
});

export const fetchPayouts = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/payout/${user_id}`)
      .then((res) => {
        dispatch(loadPayouts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchAllPayouts = () => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/payout`)
      .then((res) => {
        dispatch(loadPayouts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

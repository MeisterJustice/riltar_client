import { apiCall } from "../../services/api";
import { LOAD_SUBCATEGORIES } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadSubcategories = (subcategories) => ({
  type: LOAD_SUBCATEGORIES,
  subcategories,
});

export const fetchSubcategories = () => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/subcategory`)
      .then((res) => {
        dispatch(loadSubcategories(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postSubcategory = (data, user_id, category_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "post",
      `/api/v1/subcategory/${user_id}/${category_id}`,
      data
    )
      .then((res) => {
        dispatch(removeError());
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const putCategory = (data, user_id, category_id, subcategory_id) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "put",
      `/api/v1/subcategory/${user_id}/${category_id}/${subcategory_id}`,
      data
    )
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

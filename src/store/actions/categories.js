import { apiCall } from "../../services/api";
import { LOAD_CATEGORIES } from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  categories,
});

// export const removeCategory = (id) => ({
//   type: REMOVE_CATEGORY,
//   id,
// });

export const fetchCategories = () => {
  return (dispatch) => {
    return apiCall("get", "/api/v1/category")
      .then((res) => {
        dispatch(loadCategories(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postCategory = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/category/${user_id}`, data)
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

export const putCategory = (data, user_id, category_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/category/${user_id}/${category_id}`, data)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

// export const removeCategory = (user_id, product_id) => {
//   return (dispatch) => {
//     return apiCall("delete", `api/users/`)
//       .then(() => dispatch(removeProduct(product_id)))
//       .catch((err) => dispatch(addError(err.message)));
//   };
// };

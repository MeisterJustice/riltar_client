import { apiCall } from "../../services/api";
import {
  LOAD_PRODUCT,
  LOAD_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCTS,
  LOAD_BROWSE,
  LOAD_RECENT_VIEWED,
  LOAD_BUDGET,
  LOAD_POPULAR,
} from "../actionTypes";
import { addError, removeError } from "./errors";

export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
});
export const loadBrowse = (browse) => ({
  type: LOAD_BROWSE,
  browse,
});
export const loadPopular = (popular) => ({
  type: LOAD_POPULAR,
  popular,
});
export const loadBudget = (budget) => ({
  type: LOAD_BUDGET,
  budget,
});
export const loadRecent = (recent) => ({
  type: LOAD_RECENT_VIEWED,
  recent,
});

export const loadProduct = (product) => ({
  type: LOAD_PRODUCT,
  product,
});

export const updateProducts = (id, products) => ({
  type: UPDATE_PRODUCTS,
  id,
  products,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  id,
});

export const fetchProducts = () => {
  return (dispatch) => {
    return apiCall("get", "/api/v1/products")
      .then((res) => {
        dispatch(loadProducts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchSearchResult = (search_param) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/search/${search_param}`)
      .then((res) => {
        dispatch(loadProducts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchUserProducts = (user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/${user_id}`)
      .then((res) => {
        dispatch(loadProducts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchProduct = (user_id, product_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/${user_id}/${product_id}`)
      .then((res) => {
        dispatch(loadProduct(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const postProduct = (data, user_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/v1/product/${user_id}`, data)
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

export const postProductImage = (data, user_id, product_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/v1/product/${user_id}/${product_id}`, data)
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

export const putProduct = (data, user_id, product_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "put",
      `/api/v1/product/${user_id}/${product_id}/update`,
      data
    )
      .then((res) => {
        dispatch(updateProducts(product_id, res));
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const toggleProduct = (data, user_id, product_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return apiCall(
      "put",
      `/api/v1/product/${user_id}/${product_id}/pause`,
      data
    )
      .then((res) => {
        dispatch(updateProducts(product_id));
        resolve();
      })
      .catch((err) => {
        dispatch(addError(err.message));
        reject();
      });
  });
};

export const removeAProduct = (user_id, product_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/v1/product/${user_id}/${product_id}`)
      .then(() => dispatch(removeProduct(product_id)))
      .catch((err) => dispatch(addError(err.message)));
  };
};

export const fetchBudgetProducts = (limit) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/budget/${limit}`)
      .then((res) => {
        dispatch(loadBudget(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchSimilarProducts = (limit, subcategory_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/${limit}/${subcategory_id}`)
      .then((res) => {
        dispatch(loadProducts(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchPopularProducts = (limit) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/popular/${limit}`)
      .then((res) => {
        dispatch(loadPopular(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchBrowseProducts = (limit) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/browse/${limit}`)
      .then((res) => {
        dispatch(loadBrowse(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

export const fetchRecentProducts = (limit, user_id) => {
  return (dispatch) => {
    return apiCall("get", `/api/v1/product/${user_id}/recent/${limit}`)
      .then((res) => {
        dispatch(loadRecent(res));
      })
      .catch((err) => {
        dispatch(addError(err.messages));
      });
  };
};

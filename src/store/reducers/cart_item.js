import { LOAD_CART_ITEM } from "../actionTypes";

const cart_item = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CART_ITEM:
      return { ...action.cart };
    default:
      return state;
  }
};

export default cart_item;

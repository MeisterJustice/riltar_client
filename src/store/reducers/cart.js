import { LOAD_CART, REMOVE_CART, UPDATE_CART, ADD_CART } from "../actionTypes";

const cart = (state = [], action) => {
  switch (action.type) {
    case LOAD_CART:
      return [...action.cart];
    case ADD_CART:
      return [...state, action.cart];
    case REMOVE_CART:
      return state.filter((cart) => cart._id !== action.id);
    case UPDATE_CART:
      const index = state.findIndex((cart) => cart._id === action.id);
      const newArray = [...state];
      newArray[index] = action.cart;
      return [...newArray];
    default:
      return state;
  }
};

export default cart;

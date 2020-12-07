import { LOAD_PRODUCTS, REMOVE_PRODUCT, UPDATE_PRODUCTS } from "../actionTypes";

const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.products];
    case REMOVE_PRODUCT:
      return state.filter((product) => product._id !== action.id);
    case UPDATE_PRODUCTS:
      const index = state.findIndex((product) => product._id === action.id);
      const newArray = [...state];
      newArray[index] = action.products;
      return [...newArray];
    default:
      return state;
  }
};

export default products;

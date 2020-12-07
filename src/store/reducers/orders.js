import { LOAD_ORDERS } from "../actionTypes";

const orders = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return [...action.orders];

    default:
      return state;
  }
};

export default orders;

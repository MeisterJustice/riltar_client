import { LOAD_PAYOUTS } from "../actionTypes";

const payouts = (state = [], action) => {
  switch (action.type) {
    case LOAD_PAYOUTS:
      return [...action.payouts];
    default:
      return state;
  }
};

export default payouts;

import { LOAD_BUDGET } from "../actionTypes";

const budget = (state = [], action) => {
  switch (action.type) {
    case LOAD_BUDGET:
      return [...action.budget];
    default:
      return state;
  }
};

export default budget;

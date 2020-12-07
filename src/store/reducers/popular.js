import { LOAD_POPULAR } from "../actionTypes";

const popular = (state = [], action) => {
  switch (action.type) {
    case LOAD_POPULAR:
      return [...action.popular];
    default:
      return state;
  }
};

export default popular;

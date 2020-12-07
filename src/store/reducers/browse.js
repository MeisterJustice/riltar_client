import { LOAD_BROWSE } from "../actionTypes";

const browse = (state = [], action) => {
  switch (action.type) {
    case LOAD_BROWSE:
      return [...action.browse];
    default:
      return state;
  }
};

export default browse;

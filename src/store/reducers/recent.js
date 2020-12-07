import { LOAD_RECENT_VIEWED } from "../actionTypes";

const recent = (state = [], action) => {
  switch (action.type) {
    case LOAD_RECENT_VIEWED:
      return [...action.recent];
    default:
      return state;
  }
};

export default recent;

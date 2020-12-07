import { LOAD_VIEWS } from "../actionTypes";

const views = (state = [], action) => {
  switch (action.type) {
    case LOAD_VIEWS:
      return [...action.views];
    default:
      return state;
  }
};

export default views;

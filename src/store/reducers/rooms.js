import { LOAD_ROOMS } from "../actionTypes";

const room = (state = [], action) => {
  switch (action.type) {
    case LOAD_ROOMS:
      return [...action.room];
    default:
      return state;
  }
};

export default room;

import { LOAD_ROOM } from "../actionTypes";

const room = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ROOM:
      return { ...action.room };
    default:
      return state;
  }
};

export default room;

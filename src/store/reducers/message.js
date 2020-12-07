import { LOAD_MESSAGE, ADD_MESSAGE } from "../actionTypes";

const message = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MESSAGE:
      return { ...action.message };
    case ADD_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
};

export default message;

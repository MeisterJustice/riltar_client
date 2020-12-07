import { LOAD_MESSAGES, ADD_MESSAGES } from "../actionTypes";

const messages = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return [...action.message];
    case ADD_MESSAGES:
      return [...state, action.message]
    default:
      return state;
  }
};

export default messages;

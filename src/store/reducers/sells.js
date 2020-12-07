import { LOAD_SELLS, UPDATE_SELLS } from "../actionTypes";

const sells = (state = [], action) => {
  switch (action.type) {
    case LOAD_SELLS:
      return [...action.sells];
    case UPDATE_SELLS:
      const index = state.findIndex((sells) => sells._id === action.id);
      const newArray = [...state];
      newArray[index] = action.sells;
      return [...newArray];
    default:
      return state;
  }
};

export default sells;

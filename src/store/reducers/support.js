import { LOAD_SUPPORT, UPDATE_SUPPORT } from "../actionTypes";

const support = (state = [], action) => {
  switch (action.type) {
    case LOAD_SUPPORT:
      return [...action.support];

    case UPDATE_SUPPORT:
      const index = state.findIndex((support) => support._id === action.id);
      const newArray = [...state];
      newArray[index] = action.support;
      return [...newArray];
    default:
      return state;
  }
};

export default support;

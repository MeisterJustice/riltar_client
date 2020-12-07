import { LOAD_ADDRESS, UPDATE_ADDRESS, ADD_ADDRESS } from "../actionTypes";

const address = (state = [], action) => {
  switch (action.type) {
    case LOAD_ADDRESS:
      return [...action.address];
    case ADD_ADDRESS:
      return [...action.address];
    case UPDATE_ADDRESS:
      const index = state.findIndex((address) => address.id === action.id);
      const newArray = [...state];
      newArray[index] = action.address;
      for (var i = 0; i < newArray.length; i++) {
        if (i != index) {
          newArray[i].isDefault = false;
        }
      }
      return [...newArray];
    default:
      return state;
  }
};

export default address;

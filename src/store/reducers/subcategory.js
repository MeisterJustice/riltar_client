import { LOAD_SUBCATEGORIES, REMOVE_SUBCATEGORY } from "../actionTypes";

const subcategories = (state = [], action) => {
  switch (action.type) {
    case LOAD_SUBCATEGORIES:
      return [...action.subcategories];
    case REMOVE_SUBCATEGORY:
      return state.filter((subcategory) => subcategory._id !== action.id);
    default:
      return state;
  }
};

export default subcategories;

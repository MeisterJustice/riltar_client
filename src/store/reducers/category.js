import { LOAD_CATEGORIES, REMOVE_CATEGORY } from "../actionTypes";

const categories = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.categories];
    case REMOVE_CATEGORY:
      return state.filter((category) => category._id !== action.id);
    default:
      return state;
  }
};

export default categories;

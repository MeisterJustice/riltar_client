import { LOAD_FAVORITES, REMOVE_FAVORITE } from "../actionTypes";

const favorites = (state = [], action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      return [...action.favorites];
    case REMOVE_FAVORITE:
      return state.filter((favorite) => favorite._id !== action.id);
    default:
      return state;
  }
};

export default favorites;

import { LOAD_RATINGS, REMOVE_RATING } from "../actionTypes";

const ratings = (state = [], action) => {
  switch (action.type) {
    case LOAD_RATINGS:
      return [...action.ratings];
    case REMOVE_RATING:
      return state.filter((rating) => rating._id !== action.id);
    default:
      return state;
  }
};

export default ratings;

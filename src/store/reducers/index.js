import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import products from "./products";
import product from "./product";
import categories from "./category";
import subcategories from "./subcategory";
import orders from "./orders";
import ratings from "./rating";
import payouts from "./payout";
import favorites from "./wishlist";
import message from "./message";
import messages from "./messages";
import room from "./room";
import rooms from "./rooms";
import sells from "./sells";
import views from "./views";
import address from "./address";
import user from "./user";
import budget from "./budget";
import browse from "./browse";
import popular from "./popular";
import recent from "./recent";
import cart from "./cart";
import cart_item from "./cart_item";

const rootReducer = combineReducers({
  currentUser,
  errors,
  products,
  product,
  cart,
  cart_item,
  room,
  rooms,
  categories,
  subcategories,
  orders,
  ratings,
  payouts,
  favorites,
  message,
  messages,
  sells,
  views,
  address,
  user,
  budget,
  browse,
  popular,
  recent,
});

export default rootReducer;

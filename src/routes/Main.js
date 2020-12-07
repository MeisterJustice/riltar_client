import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import Homepage from "../containers/Homepage";
import Admin from "../containers/admin/Admin";
import Profile from "../containers/profile/Profile";
import Orders from "../containers/profile/Orders";
import Sells from "../containers/profile/Sells";
import Store from "../containers/profile/Store";
import Reviews from "../containers/profile/Reviews";
import Payout from "../containers/profile/Payout";
import Favorite from "../containers/profile/Favorite";
import Coupons from "../containers/buyer/Coupons";
import DiscoverPopular from "../containers/buyer/DiscoverPopular";
import SearchResult from "../containers/buyer/SearchResult";
import ProductShow from "../containers/buyer/ProductShow";
import Cart from "../containers/buyer/Cart";
import Checkout from "../containers/buyer/Checkout";
import DiscoverBudget from "../containers/buyer/DiscoverBudget";
import DiscoverViewed from "../containers/buyer/DiscoverViewed";
import DiscoverCategory from "../containers/buyer/DiscoverCategory";
import DiscoverSubcategory from "../containers/buyer/DiscoverSubcategory";
import Sell from "../containers/buyer/Sell";
import LoginScreen from "../containers/auth/Login";
import SignupQuestionScreen from "../containers/auth/SignupQuestion";
import SignupAsBusinessScreen from "../containers/auth/SignupSeller";
import SignupAsBuyerScreen from "../containers/auth/SignupBuyer";
import Address from "../containers/profile/Address";
import PersonalDetails from "../containers/profile/PersonalDetails";
import BankDetails from "../containers/profile/BankDetails";
import Password from "../containers/profile/Password";
import Support from "../containers/profile/Support";
import Message from "../containers/buyer/Message";
import MessageShow from "../containers/buyer/MessageShow";

const Main = (props) => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Homepage errors={errors} currentUser={currentUser} {...props} />
          )}
        ></Route>
        <Route
          exact
          path="/signin"
          render={(props) => {
            return (
              <LoginScreen
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                {...props}
              />
            );
          }}
        ></Route>
        <Route
          exact
          path="/signup"
          render={(props) => {
            return <SignupQuestionScreen {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/signup/business"
          render={(props) => {
            return (
              <SignupAsBusinessScreen
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                {...props}
              />
            );
          }}
        ></Route>
        <Route
          exact
          path="/signup/buyer"
          render={(props) => {
            return (
              <SignupAsBuyerScreen
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                {...props}
              />
            );
          }}
        ></Route>
        <Route
          exact
          path="/sell"
          render={(props) => {
            return <Sell {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/admin"
          render={(props) => {
            return <Admin {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/message"
          render={(props) => {
            return <Message {...props} />;
          }}
        />
        <Route
          exact
          path="/message/:room_id"
          render={(props) => {
            return <MessageShow {...props} />;
          }}
        />
        <Route
          exact
          path="/profile"
          render={(props) => {
            return <Profile {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/profile/sales"
          render={(props) => {
            return <Sells {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/my-store"
          render={(props) => {
            return <Store errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/pending-reviews"
          render={(props) => {
            return <Reviews errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/payouts"
          render={(props) => {
            return <Payout {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/wish-list"
          render={(props) => {
            return <Favorite {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/orders"
          render={(props) => {
            return <Orders {...props} />;
          }}
        ></Route>

        <Route
          exact
          path="/profile/favorites"
          component={withAuth(Favorite)}
        ></Route>
        <Route
          exact
          path="/profile/address-book"
          render={(props) => {
            return <Address errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/personal-details"
          render={(props) => {
            return <PersonalDetails errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/bank-details"
          render={(props) => {
            return <BankDetails errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/change-password"
          render={(props) => {
            return <Password errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/profile/support"
          render={(props) => {
            return <Support errors={errors} {...props} />;
          }}
        />
        <Route
          exact
          path="/coupons"
          render={(props) => {
            return <Coupons {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/popular-products"
          render={(props) => {
            return <DiscoverPopular {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/budget"
          render={(props) => {
            return <DiscoverBudget {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/recently-viewed-products"
          component={withAuth(DiscoverViewed)}
        ></Route>
        <Route
          exact
          path="/categories/:categoryId/products"
          render={(props) => {
            return <DiscoverCategory {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/subcategories/:subcategoryId/products"
          render={(props) => {
            return <DiscoverSubcategory {...props} />;
          }}
        ></Route>

        <Route
          exact
          path="/cart"
          render={(props) => {
            return <Cart {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/checkout/:cart_id"
          render={(props) => {
            return <Checkout {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/:search_params"
          render={(props) => {
            return <SearchResult {...props} />;
          }}
        ></Route>
        <Route
          exact
          path="/:product_name/:product_id"
          render={(props) => {
            return <ProductShow {...props} />;
          }}
        ></Route>
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);

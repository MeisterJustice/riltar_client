import React, { useState, lazy, Suspense, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import {
  fetchCart,
  removeACart,
  updateCartItem,
} from "../../store/actions/cart";

import { fetchBrowseProducts } from "../../store/actions/products";

import CartSkeleton from "../../components/general-components/skeleton/pc/CartPc";
import CartSkeletonMobile from "../../components/general-components/skeleton/mobile/Cart";
const CartMobile = lazy(() => import("../../components/mobile/Cart"));
const CartPc = lazy(() => import("../../components/pc/Cart"));

const Cart = (props) => {
  const [done, setDone] = useState(false);

  async function fetch() {
    await props.fetchCart(props.currentUser.user.id);
    await setDone(true);
    props.fetchBrowseProducts(12);
  }

  useEffect(() => {
    fetch();
  }, []);
  if (isMobileOnly) {
    return (
      <Suspense fallback={<CartSkeletonMobile />}>
        {done ? (
          <CartMobile
            removeACart={props.removeACart}
            cart={props.cart}
            updateCartItem={props.updateCartItem}
            {...props}
            currentUser={props.currentUser}
            logout={props.logout}
            products={props.browse}
          />
        ) : (
          <CartSkeletonMobile />
        )}
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<CartSkeleton />}>
      {done ? (
        <CartPc
          updateCartItem={props.updateCartItem}
          removeACart={props.removeACart}
          cart={props.cart}
          products={props.browse}
          {...props}
        />
      ) : (
        <CartSkeleton />
      )}
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    cart: state.cart,
    browse: state.browse,
  };
}

export default connect(mapStateToProps, {
  logout,
  fetchCart,
  removeACart,
  updateCartItem,
  fetchBrowseProducts,
})(Cart);

import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import CheckoutPc from "../../components/general-components/skeleton/Checkout";
const CheckoutScreen = lazy(() => import("../../components/checkout/Checkout"));

const Checkout = (props) => {
  return (
    <Suspense fallback={<CheckoutPc />}>
      <CheckoutScreen {...props} currentUser={props.currentUser} />
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Checkout);

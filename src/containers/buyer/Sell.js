import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import SellSk from "../../components/general-components/skeleton/Sell";
const SellPage = lazy(() => import("../../components/sell/Sell"));

const Sell = (props) => {
  return (
    <Suspense fallback={<SellSk />}>
      <SellPage currentUser={props.currentUser} {...props} />
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Sell);

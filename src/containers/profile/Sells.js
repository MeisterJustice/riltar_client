import React, { lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
const SellsPc = lazy(() => import("../../components/pc/profile/sells/Sells"));
const SellsMobile = lazy(() =>
  import("../../components/mobile/profile/sells/Sells")
);

const Sells = (props) => {
  if (isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <SellsMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
        />
      </Suspense>
    );
  }
  if (!isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <SellsPc currentUser={props.currentUser} {...props} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Sells);

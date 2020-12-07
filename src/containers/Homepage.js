import React, { useState, useEffect, lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { logout } from "../store/actions/auth";
import { connect } from "react-redux";

import HomeSkeletonPc from "../components/general-components/skeleton/pc/Home";
import HomeSkeletonMobile from "../components/general-components/skeleton/mobile/Home";
const HomepagePc = lazy(() => import("../components/pc/homepage/Homepage"));
const HomepageMobile = lazy(() =>
  import("../components/mobile/homepage/Homepage")
);

const Homepage = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logout();
  };
  const { currentUser } = props;
  if (isMobile) {
    return (
      <Suspense fallback={<HomeSkeletonMobile />}>
        <HomepageMobile {...props} currentUser={currentUser} logout={logout} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<HomeSkeletonPc />}>
      <HomepagePc {...props} currentUser={currentUser} logout={logout} />
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}
export default connect(mapStateToProps, {
  logout,
})(Homepage);

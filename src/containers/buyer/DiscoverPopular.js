import React, { lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import DiscoverSkeletonMobile from "../../components/general-components/skeleton/mobile/Discover";
const DiscoverPopularPc = lazy(() =>
  import("../../components/pc/DiscoverPopular")
);
const DiscoverPopularMobile = lazy(() =>
  import("../../components/mobile/DiscoverPopular")
);

const DiscoverPopular = (props) => {
  if (isMobileOnly) {
    return (
      <Suspense fallback={<DiscoverSkeletonMobile />}>
        <DiscoverPopularMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
        />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<DiscoverPc />}>
      <DiscoverPopularPc {...props} currentUser={props.currentUser} />
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(DiscoverPopular);

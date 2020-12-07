import React, { lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import DiscoverSkeletonMobile from "../../components/general-components/skeleton/mobile/Discover";
const DiscoverViewedPc = lazy(() =>
  import("../../components/pc/DiscoverViewed")
);
const DiscoverViewedMobile = lazy(() =>
  import("../../components/mobile/DiscoverViewed")
);

const DiscoverViewed = (props) => {
  if (isMobileOnly) {
    return (
      <Suspense fallback={<DiscoverSkeletonMobile />}>
        <DiscoverViewedMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
        />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<DiscoverPc />}>
      <DiscoverViewedPc {...props} currentUser={props.currentUser} />
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(DiscoverViewed);

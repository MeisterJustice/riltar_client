import React, { lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import DiscoverSkeletonMobile from "../../components/general-components/skeleton/mobile/Discover";
const DiscoverBudgetPc = lazy(() =>
  import("../../components/pc/DiscoverBudget")
);
const DiscoverBudgetMobile = lazy(() =>
  import("../../components/mobile/DiscoverBudget")
);

const DiscoverBudget = (props) => {
  if (isMobileOnly) {
    return (
      <Suspense fallback={<DiscoverSkeletonMobile />}>
        <DiscoverBudgetMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<DiscoverPc />}>
        <DiscoverBudgetPc {...props} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(DiscoverBudget);

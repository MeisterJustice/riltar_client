import React, { lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
const AddressPc = lazy(() =>
  import("../../components/pc/profile/address/Address")
);
const AddressMobile = lazy(() =>
  import("../../components/mobile/profile/address/Address")
);

const Address = (props) => {
  if (isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <AddressMobile
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
        <AddressPc currentUser={props.currentUser} {...props} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Address);

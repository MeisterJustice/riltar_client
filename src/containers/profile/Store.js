import React, { lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
const ProfilePc = lazy(() =>
  import("../../components/pc/profile/my_store/MyStore")
);
const MyStoreMobile = lazy(() =>
  import("../../components/mobile/profile/my_store/MyStore")
);

const Store = (props) => {
  if (isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <MyStoreMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
          errors={props.errors}
        />
      </Suspense>
    );
  }
  if (!isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <ProfilePc
          errors={props.errors}
          currentUser={props.currentUser}
          {...props}
        />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Store);

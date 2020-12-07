import React, { lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
const ProfilePc = lazy(() =>
  import("../../components/pc/profile/index/Profile")
);
const ProfileMobile = lazy(() =>
  import("../../components/mobile/profile/index/Profile")
);

const Pofile = (props) => {
  if (isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <ProfileMobile
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
        <ProfilePc currentUser={props.currentUser} {...props} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Pofile);

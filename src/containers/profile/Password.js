import React, { lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
const PasswordPc = lazy(() => import("../../components/pc/profile/Password"));
const PasswordMobile = lazy(() =>
  import("../../components/mobile/profile/Password")
);

const Password = (props) => {
  if (isMobile) {
    return (
      <Suspense fallback={<div>loading....</div>}>
        <PasswordMobile
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
        <PasswordPc currentUser={props.currentUser} {...props} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Password);

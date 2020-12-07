import React, { lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";

const MessagePc = lazy(() => import("../../components/pc/message/Message"));
const MessageMobile = lazy(() =>
  import("../../components/mobile/message/Message")
);

const Message = (props) => {
  if (isMobileOnly) {
    return (
      <Suspense fallback={""}>
        <MessageMobile {...props} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={""}>
      <MessagePc {...props} />
    </Suspense>
  );
};
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
})(Message);

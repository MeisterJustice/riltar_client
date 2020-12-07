import React, { lazy, Suspense, useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { fetchRoom } from "../../store/actions/message";

const MessagePc = lazy(() => import("../../components/pc/message/Message"));
const MessageMobile = lazy(() =>
  import("../../components/mobile/message/MessageShow")
);

const MessageShow = (props) => {
const [done, setDone] = useState(false)
  const fetch = async () => {
    await props.fetchRoom(props.currentUser.user.id, props.match.params.room_id)
    await setDone(true)
  }
  useEffect(() => {
    fetch()
  },[])
  if (isMobileOnly) {
    return (
      <Suspense fallback={""}>
        {done && (

        <MessageMobile room={props.room} {...props} />
        )}
      </Suspense>
    );
  }
  return (
    <Suspense fallback={""}>
      {done && (

      <MessagePc room={props.room} {...props} />
      )}
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    room: state.room,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchRoom
})(MessageShow);

import React, { useEffect, useState } from "react";
import { Box, } from "@material-ui/core";
import Header from "../profile/components/Header";
import MessageItem from "./MessageItem";
import { fetchRooms } from "../../../store/actions/message";
import { connect } from "react-redux";


const MessageMobile = (props) => {
  const [isDone, setIsDone] = useState(false)

  const fetch = async () => {
    await props.fetchRooms(props.currentUser.user.id).then(() => {
      setIsDone(true)
    })
  }
  useEffect(() => {
    fetch()
  },[])
  return (
    <Box>
      <Header text="Inbox" />
      {isDone && (<MessageItem {...props} rooms={props.rooms} />)}
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    rooms: state.rooms,
  };
}

export default connect(mapStateToProps, {
  fetchRooms
})(MessageMobile);

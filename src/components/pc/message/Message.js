import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import MessageItem from "./MessageItem";
import { fetchRooms } from "../../../store/actions/message";
import { connect } from "react-redux";

const MessagePc = (props) => {
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
      {isDone && (<MessageItem {...props} rooms={props.rooms} />)}
    </Box>
  )
};

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
  };
}

export default connect(mapStateToProps, {
  fetchRooms
})(MessagePc);

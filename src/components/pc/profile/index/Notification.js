import React from "react";
import { Link } from "react-router-dom";
import { Box, Avatar } from "@material-ui/core";
import Moment from "react-moment";

const Notification = (props) => {
  const sender = (props.currentUser.user.id = props.room.seller._id
    ? props.room.customer
    : props.room.seller);
  return (
    <Link className="link" to="#">
      <Box py={2} display="flex" justifyContent="space-between">
        <Box mx={0.7}>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box>
              <Avatar
                style={{ opacity: props.room.isRead ? 0.7 : 1 }}
                alt={
                  sender ? `${sender.firstName} ${sender.lastName}` : "Admin"
                }
                src={!sender ? "hfjfjj" : sender.profilePicture}
              />
            </Box>
            <Box fontSize={13} ml={0.5}>
              <Box
                style={{ opacity: props.room.isRead ? 0.7 : 1 }}
                fontWeight={600}
              >
                {sender
                  ? `${sender.firstName} ${sender.lastName}`
                  : "Riltar Admin"}
              </Box>
              <Box
                fontSize={12}
                mt={0.5}
                style={{ opacity: props.room.isRead ? 0.7 : 1 }}
              >
                {props.room.lastMessage.substring(0, 25)}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          fontSize={10.5}
          mt={0.5}
          fontWeight={600}
          mx={0.5}
          style={{ opacity: 0.8 }}
        >
          <Moment fromNow>{props.room.updatedAt}</Moment>
        </Box>
      </Box>
    </Link>
  );
};

export default Notification;

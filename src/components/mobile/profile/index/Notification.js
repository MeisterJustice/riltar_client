import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const Notification = (props) => {
  return (
    <AvatarGroup max={5}>
      {props.rooms.map((room, index) => (
        <Avatar
          key={room._id}
          alt={
            (props.currentUser.user.id = room.seller._id
              ? `${room.customer.firstName} ${props.room.customer.lastName}`
              : `${room.seller.firstName} ${room.seller.lastName}`)
          }
          src={
            (props.currentUser.user.id = room.seller._id
              ? room.customer.images[0]
              : room.seller.images[0])
          }
        />
      ))}
    </AvatarGroup>
  );
};

export default Notification;

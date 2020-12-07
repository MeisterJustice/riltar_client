import React, { useEffect, useState } from 'react';
import MessageItem2 from './MessageItem2';

const MessageItem = (props) => {
const [selectedRoom, setSelectedRoom] = useState({})

const selectRoom = (room) => {
  setSelectedRoom(room)
}

  useEffect(() => {
    setSelectedRoom(props.rooms.length > 0 ? props.rooms[0] : {_id: 'ijjkjkk'})
    }, []);
return (
  <MessageItem2 selectRoom={selectRoom} rooms={props.rooms} room={selectedRoom} {...props} />
)
}

export default MessageItem;
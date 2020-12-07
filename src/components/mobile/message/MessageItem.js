import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Empty from '../../pc/profile/components/Empty'


const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const MessageItem = (props) => {
  const classes = useStyles();
  return (
    <Box>
      {props.rooms.length <= 0 && (
        <Empty text="Nothing Here!" />
      )}
      {props.rooms.map((room, index) => (
        <Link key={room._id} to={`/message/${room._id}`} className="link">
          <Box mt={index === 0 ? 3 : 5} mx={1.5}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Avatar className={classes.small} alt={room.seller._id === props.currentUser.user.id ? room.customer.firstName : room.seller.firstName} src={room.seller._id === props.currentUser.user.id ? room.customer.profilePicture : room.seller.profilePicture} />
              </Grid>
              <Grid item xs={6}>
      <Box display="inline">{
        room.seller._id === props.currentUser.user.id ? `${room.customer.firstName} ${room.customer.lastName}` : `${room.seller.firstName} ${room.seller.lastName}`
      }</Box>
                <Box component="div" overflow="visible" color="gray" mt={1}>
                  {room.lastMessage.substring(
                    0,
                    50
                  )}{" "}
                  ...
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box fontSize={12.5} color="gray" display="inline">
                <Moment format="D/M, h:mm a">{room.updatedAt}</Moment>
                </Box>
              {room.seller === props.currentUser.user.id && room.sellerToRead > 1 && (

                <Box
                  align="center"
                  mt={1}
                  ml={3}
                  height="20px"
                  width="20px"
                  borderRadius={20}
                  className="callToAction"
                >
                  {room.seller === props.currentUser.user.id ? room.sellerToRead : room.customerToRead}
                </Box>
              )} 
              {room.customer === props.currentUser.user.id && room.customerToRead > 0 && (

              <Box
                align="center"
                mt={1}
                ml={3}
                height="20px"
                width="20px"
                borderRadius={20}
                className="callToAction"
              >
                {room.seller === props.currentUser.user.id ? room.sellerToRead : room.customerToRead}
              </Box>
              )} 
              </Grid>
            </Grid>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default MessageItem;

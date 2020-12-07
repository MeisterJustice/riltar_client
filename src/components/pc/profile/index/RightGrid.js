import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import Skeleton from "@material-ui/lab/Skeleton";

const RightGrid = (props) => {
  const [order, setOrder] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let undeliveredOrder = 0;
    props.orders.forEach((order) => {
      if (!order.isDelivered) {
        undeliveredOrder += 1;
      }
    });
    setOrder(undeliveredOrder);
    setDone(true);
  }, []);
  return (
    <Box
      p={2}
      bgcolor="white"
      display="flex"
      boxShadow={1}
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      color="#57584E"
    >
      <Box>
        <Box fontWeight={600}>Sales in Queue</Box>
        <Box
          align="center"
          fontWeight={600}
          color="#57584E"
          fontSize={25}
          mt={1}
        >
          {done ? (
            order
          ) : (
            <Skeleton variant="text" width={60} height={40} animation="wave" />
          )}
        </Box>
        <Link className="profileLink" to="/profile/sales">
          <Box
            color="#ff6600"
            border={1}
            align="center"
            borderColor="#ff6600"
            mt={1}
            p={0.5}
            fontSize={13}
            className="profileLink"
          >
            go to sales
          </Box>
        </Link>
      </Box>
      <Box width={1} mt={6}>
        <Box
          fontSize={14}
          width={1}
          py={2}
          display="flex"
          border={1}
          justifyContent="space-between"
        >
          <Box mx={0.7}>Messages</Box>
          <Box mx={0.7}>
            <Link to="/message">View All</Link>
          </Box>
        </Box>
        <Box width={1} border={1} borderTop={0}>
          {props.rooms.map((room, index) => (
            <Notification {...props} room={room} key={room._id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RightGrid;

import React from "react";
import { Box } from "@material-ui/core";

const RightGrid = (props) => {
  return (
    <Box width={1} border={1} m={1}>
      <Box fontWeight={650} borderBottom={1} p={1} pl={2}>
        DELIVERY INFORMATION
      </Box>
      <Box fontSize={13} mt={2} p={1} pl={2}>
        <Box>
          <Box fontWeight={600}>Delivery Method</Box>
          <Box mt={1} color="gray">
            Standard Delivery
          </Box>
        </Box>
        <Box mt={2.5}>
          <Box fontWeight={600}>Delivery Address</Box>
          <Box mt={1} color="gray">
            {props.order.deliveryAddress.firstName}{" "}
            {props.order.deliveryAddress.lastName}
          </Box>
          <Box mt={1} color="gray">
            {props.order.deliveryAddress.phone}
          </Box>
          <Box mt={1} color="gray">
            {props.order.deliveryAddress.address},{" "}
            {props.order.deliveryAddress.city}
          </Box>
          <Box mt={1} color="gray">
            {props.order.deliveryAddress.state}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightGrid;

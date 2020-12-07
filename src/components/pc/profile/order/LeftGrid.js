import React from "react";
import { Box } from "@material-ui/core";
import Currency from "../../../general-components/Currency";

const LeftGrid = (props) => {
  return (
    <Box width={1} border={1} m={1}>
      <Box fontWeight={650} borderBottom={1} p={1} pl={2}>
        PAYMENT INFORMATION
      </Box>
      <Box fontSize={13} mt={2} p={1} pl={2}>
        <Box>
          <Box fontWeight={600}>Payment Method</Box>
          <Box mt={1} color="gray">
            {props.order.paymentMethod}
          </Box>
        </Box>
        <Box mt={2.5}>
          <Box fontWeight={600}>Payment Details</Box>
          <Box mt={1} color="gray">
            Quantity: x {props.order.quantity}
          </Box>
          <Box mt={1} color="gray">
            Items Total: <Currency price={props.order.price} />
          </Box>
          <Box mt={1} color="gray">
            Delivery Fee: <Currency price={0} />
          </Box>
          <Box mt={1} color="gray">
            Total: <Currency price={props.order.totalPrice} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftGrid;

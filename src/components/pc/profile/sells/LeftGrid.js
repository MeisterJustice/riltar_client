import React from "react";
import { Box } from "@material-ui/core";
import Currency from "../../../general-components/Currency";

const LeftGrid = (props) => {
  const { row } = props;
  return (
    <Box width={1} border={1} m={1}>
      <Box fontWeight={650} borderBottom={1} p={1} pl={2}>
        PAYMENT INFORMATION
      </Box>
      <Box fontSize={13} mt={2} p={1} pl={2}>
        <Box>
          <Box fontWeight={600}>Payment Method</Box>
          <Box mt={1} color="gray">
            Pay on Delivery
          </Box>
        </Box>
        <Box mt={2.5}>
          <Box fontWeight={600}>Payment Details</Box>
          <Box mt={1} color="gray">
            Quantity: {row.quantity}
          </Box>
          <Box mt={1} color="gray">
            Items Total: <Currency price={row.price} />
          </Box>
          <Box mt={1} color="gray">
            Delivery Fee: <Currency price={0} />
          </Box>
          <Box mt={1} color="gray">
            Total: <Currency price={row.totalPrice} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftGrid;

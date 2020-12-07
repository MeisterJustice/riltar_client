import React from "react";
import { Box } from "@material-ui/core";

const RightGrid = (props) => {
  const { row } = props;
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
            {row.user.firstName} {row.user.lastName}
          </Box>
          <Box mt={1} color="gray">
            {row.user.phone}
          </Box>
          <Box mt={1} color="gray">
            {row.user.location.country}
          </Box>
          <Box mt={1} color="gray">
            Lagos State
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightGrid;

import React from "react";
import { Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const CheckoutHeader = (props) => {
  return (
    <Box bgcolor="#0077be" boxShadow={1}>
      <Container>
        <Box
          height={40}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box fontSize={20} fontWeight="bold">
            <Link to="/" className="textColor">
              <Box color="white">Riltar</Box>
            </Link>
          </Box>
          <Box color="white">Checkout</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutHeader;

import React from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Empty = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="70vh"
    >
      <Box textAlign="center" color="green" fontSize={27} fontWeight={600}>
        {props.text}
      </Box>
      <Box mt={2}>
        <Link to="/" className="link">
          <Button variant="contained" className="callToAction">
            Continue Shopping
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Empty;

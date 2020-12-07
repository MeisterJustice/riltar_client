import React from "react";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const SellButtonMobile = ({ currentUser, logout }) => {
  return (
    <Box
      fontSize="20px"
      mt={3}
      style={{ position: "fixed", right: "0", bottom: "0" }}
      mb={2}
      textAlign="right"
      mr={2}
    >
      <Link className="textColor" to="/sell">
        <Fab
          style={{ width: "60px", height: "60px" }}
          className="callToAction"
          color="secondary"
          aria-label="Sell Product"
        >
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
};

export default SellButtonMobile;

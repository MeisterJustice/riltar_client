import React from "react";
import { Box, Link } from "@material-ui/core";

const Header = (props) => {
  return (
    <Box mb={3} fontWeight="bold" fontSize={27}>
      <Link className="textColor cursor" to="/">
        Riltar
      </Link>
    </Box>
  );
};

export default Header;

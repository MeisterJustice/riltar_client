import React from "react";
import { Badge, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const NavbarItem = (props) => {
  return (
    <Box
      button
      fontSize="14px"
      className="cursor"
      textAlign="center"
      mr={2.2}
      mt={2.4}
    >
      <Link className="link" to="/message">
        <Badge variant="dot" overlap="circle" badgeContent={1} color="error">
          <MailOutlineIcon style={{ color: "white" }} />
        </Badge>
      </Link>
    </Box>
  );
};

export default NavbarItem;

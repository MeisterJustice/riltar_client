import { Badge, Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
const NavbarItem = (props) => {
  return (
    <Box className="cursor" mr={1.7}>
      <Link className="textColor" to="/message">
        <Badge variant="dot" overlap="circle" badgeContent={1} color="error">
          <MailOutlineIcon style={{ fontSize: "28px", color: "white" }} />
        </Badge>
      </Link>
    </Box>
  );
};

export default NavbarItem;

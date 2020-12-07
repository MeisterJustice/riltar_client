import React from "react";
import { Badge, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const NavbarItem2 = (props) => {
  return (
    <Box
      fontSize="14px"
      className="cursor"
      textAlign="center"
      mr={2.5}
      mt={2.4}
    >
      <Link className="link" to="/cart">
        <Badge max={10} badgeContent={props.cart.length} color="error">
          <ShoppingCartOutlinedIcon style={{ color: "white" }} />
        </Badge>
      </Link>
    </Box>
  );
};

export default NavbarItem2;

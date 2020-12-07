import { Badge, Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const NavbarItem2 = (props) => {
  return (
    <Box className="cursor">
      <Link className="textColor" to="/cart">
        <Badge max={10} badgeContent={props.cart.length} color="error">
          <ShoppingCartOutlinedIcon
            style={{ fontSize: "28px", color: "white" }}
          />
        </Badge>
      </Link>
    </Box>
  );
};

export default NavbarItem2;

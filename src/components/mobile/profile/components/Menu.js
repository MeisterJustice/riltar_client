import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Box, Badge } from "@material-ui/core";

import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";

// list of items
const list = [
  {
    name: "Profile",
    icon: <PersonOutlineIcon />,
    alert: 0,
  },
  {
    name: "Sales",
    icon: <MonetizationOnOutlinedIcon />,
    alert: 0,
  },
  {
    name: "My Store",
    icon: <StorefrontOutlinedIcon />,
    alert: 0,
  },
  {
    name: "Orders",
    icon: <AccountBalanceWalletOutlinedIcon />,
    alert: 0,
  },
  {
    name: "Pending Reviews",
    icon: <RateReviewOutlinedIcon />,
    alert: 0,
  },
  {
    name: "Payouts",
    icon: <SendOutlinedIcon />,
    alert: 0,
  },
  {
    name: "Wish List",
    icon: <FavoriteBorderOutlinedIcon />,
    alert: 0,
  },
];

const MenuItem = ({ text }) => {
  return (
    <Link
      className="link"
      to={
        text.name === "Profile"
          ? "/profile"
          : `/profile/${text.name.toLowerCase().split(" ").join("-")}`
      }
    >
      <Box
        px={0.4}
        py={1.3}
        borderRadius={10}
        style={{
          backgroundColor:
            window.location.pathname === "/profile" && text.name === "Home"
              ? "#fafafa"
              : window.location.pathname.includes(
                  text.name.toLowerCase().split(" ").join("-")
                )
              ? "#fafafa"
              : null,
        }}
        mr={3.5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Badge badgeContent={text.alert} color="secondary">
            {text.icon}
          </Badge>
        </Box>
        <Box>{text.name}</Box>
      </Box>
    </Link>
  );
};

export const Menu = (list, selected) =>
  list.map((el, index) => {
    return <MenuItem text={el} key={index} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class MenuMobile extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list);
  }

  render() {
    const menu = this.menuItems;

    return (
      <Box p={1} boxShadow={2} borderRadius={10} mt={2}>
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideSingleArrow={true}
          useButtonRole={true}
        />
      </Box>
    );
  }
}

export default MenuMobile;

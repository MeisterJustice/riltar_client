import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import { Box } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import LazyLoad from "react-lazyload";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const secMenuTitle = [
  "Address Book",
  "Personal Details",
  "Bank Details",
  "Change Password",
];

const MenuItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  const menuTitle = [
    {
      name: "Home",
      icon: <HomeOutlinedIcon style={{ color: "#ebc3ae" }} />,
      alert: 0,
    },
    {
      name: "Sales",
      icon: <MonetizationOnOutlinedIcon style={{ color: "#75f073" }} />,
      alert: 0,
    },
    {
      name: "My Store",
      icon: <StorefrontOutlinedIcon style={{ color: "#0077be" }} />,
      alert: 0,
    },
    {
      name: "Orders",
      icon: <AccountBalanceWalletOutlinedIcon style={{ color: "#703f21" }} />,
      alert: 0,
    },
    {
      name: "Pending Reviews",
      icon: <RateReviewOutlinedIcon style={{ color: "#11918d" }} />,
      alert: 0,
    },
    {
      name: "Payouts",
      icon: <SendOutlinedIcon style={{ color: "#972ab0" }} />,
      alert: 0,
    },
    {
      name: "Wish List",
      icon: <FavoriteBorderOutlinedIcon style={{ color: "#e83023" }} />,
      alert: 0,
    },
  ];

  return (
    <Box bgcolor="#011B33" color="white" width={1} boxShadow={2}>
      <Box pt={4}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="130px"
        >
          <Avatar
            alt={`${props.user.firstName} ${props.user.lastName}`}
            src={props.user.profilePicture}
            className={classes.large}
          />
        </Box>
        <Box fontWeight={550} fontSize={22} mt={1} textAlign="center">
          {props.user.firstName} {props.user.lastName}
        </Box>
        {props.user.averageRating > 0 && (
          <Box
            mt={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Rating
              name="rating"
              title="rating"
              defaultValue={props.user.averageRating}
              size="small"
              precision={0.5}
              readOnly
            />
            <Box fontSize={13} display="inline" ml={1} fontWeight={550}>
              ({props.user.averageRating})
            </Box>
          </Box>
        )}
        {props.user.feedback > 0 && (
          <Box align="center" fontSize={13} mt={1}>
            {props.user.feedback}% positive feedback
          </Box>
        )}
        <Box mt={2}>
          <List component="nav" aria-label="main mailbox folders">
            {menuTitle.map((menu, index) => (
              <Link
                className="link"
                key={index}
                to={
                  menu.name === "Home"
                    ? "/profile"
                    : `/profile/${menu.name.toLowerCase().split(" ").join("-")}`
                }
              >
                <ListItem
                  style={{
                    color: "white",
                    backgroundColor:
                      window.location.pathname === "/profile" &&
                      menu.name === "Home"
                        ? "#092b4a"
                        : window.location.pathname.includes(
                            menu.name.toLowerCase().split(" ").join("-")
                          )
                        ? "#092b4a"
                        : null,
                  }}
                  button
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                  {menu.alert === 0 ? (
                    <Box></Box>
                  ) : (
                    <Box
                      borderRadius={20}
                      className="callToAction"
                      py={0.5}
                      fontSize={10}
                      px={0.9}
                      color="white"
                      display="inline"
                    >
                      2
                    </Box>
                  )}
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List component="nav" aria-label="secondary menu">
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <SettingsOutlinedIcon style={{ color: "#40302f" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {secMenuTitle.map((menu, index) => (
                  <Link
                    style={{ color: "white" }}
                    className="link"
                    key={index}
                    to={`/profile/${menu.toLowerCase().split(" ").join("-")}`}
                  >
                    <ListItem key={index} button>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={menu} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Collapse>
          </List>
          <List component="nav" aria-label="main mailbox folders">
            <Link className="link" to="/profile/support">
              <ListItem
                style={{
                  color: "white",
                  backgroundColor:
                    window.location.pathname === "/support" ? "#092b4a" : null,
                }}
                button
              >
                <ListItemIcon>
                  <ContactSupportOutlinedIcon style={{ color: "#fc038c" }} />
                </ListItemIcon>
                <ListItemText primary="Support" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuItem;

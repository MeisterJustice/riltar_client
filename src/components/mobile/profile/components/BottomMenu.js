import React from "react";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";

const secMenuTitle = [
  "Address Book",
  "Personal Details",
  "Bank Details",
  "Change Password",
];

const BottomMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      position="fixed"
      bottom={0}
      overflow="hidden"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      boxShadow={2}
      p={1}
      style={{ width: "100%" }}
      bgcolor="#011B33"
    >
      <Box>
        <Link to="/" className="link">
          <Box align="center">
            <HomeOutlinedIcon style={{ color: "white" }} />
          </Box>
          <Box color="white" mt={0.5}>
            Home
          </Box>
        </Link>
      </Box>
      <Box
        aria-controls="settings-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box align="center">
          <SettingsOutlinedIcon style={{ color: "white" }} />
        </Box>
        <Box color="white" mt={0.5}>
          Settings
        </Box>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {secMenuTitle.map((menu, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Link
              to={`/profile/${menu.toLowerCase().split(" ").join("-")}`}
              className="link"
            >
              {menu}
            </Link>
          </MenuItem>
        ))}
      </Menu>
      <Box>
        <Link to="/profile/support" className="link">
          <Box align="center">
            <ContactSupportOutlinedIcon style={{ color: "white" }} />
          </Box>
          <Box color="white" mt={0.5}>
            Support
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default BottomMenu;

import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Avatar } from "@material-ui/core";

const Draw = (props) => {
  return (
    <SwipeableDrawer
      open={props.isDrawerOpen}
      onClose={props.handleDrawerClose}
      onOpen={props.handleDrawerOpen}
    >
      <Box pr={9}>
        <Container>
          <Box>
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
            >
              <Box onClick={props.handleDrawerClose} fontSize="30px">
                <CloseIcon fontSize="large" />
              </Box>
              <Box mt={1.3} fontWeight="bold" ml={1}>
                Riltar
              </Box>
            </Box>
            <Box mt={1}>
              <Link className="link" to="/profile">
                {props.currentUser.isAuthenticated && (
                  <Box>
                    <Box ml={0.5}>
                      <Avatar
                        style={{
                          height: "35px",
                          width: "35px",
                          fontSize: "14px",
                          background: "#0077be",
                          fontWeight: "bold",
                        }}
                      >
                        {props.currentUser.user.firstName.substring(0, 1)}
                        {props.currentUser.user.lastName.substring(0, 1)}
                      </Avatar>
                    </Box>
                    <Box fontWeight="bold">profile</Box>
                  </Box>
                )}
                {!props.currentUser.isAuthenticated && (
                  <Box ml={0.5}>
                    <AccountCircleOutlinedIcon fontSize="large" />
                    <Box fontWeight="bold">profile</Box>
                  </Box>
                )}
              </Link>
            </Box>
          </Box>
          <Box mt={1}>
            {!props.currentUser.isAuthenticated && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-between"
              >
                <Link className="textColor" to="/signup">
                  <Box
                    px={1.5}
                    py={0.5}
                    borderRadius="20px"
                    className="callToAction"
                  >
                    Sign Up
                  </Box>
                </Link>
                <Link className="textColor" to="/signin">
                  <Box
                    px={1.5}
                    py={0.5}
                    ml={1}
                    borderRadius="20px"
                    className="callToAction"
                  >
                    Sign In
                  </Box>
                </Link>
              </Box>
            )}
            {props.currentUser.isAuthenticated && (
              <Box
                textAlign="center"
                px={1}
                py={0.5}
                borderRadius="20px"
                className="callToAction"
                onClick={props.logout}
              >
                Logout
              </Box>
            )}
          </Box>
          <Box mt={2}></Box>
          <Divider />
          <List>
            {props.categories.map((category, index) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}/products`}
                className="textColor"
              >
                <ListItem button key={category.title}>
                  <ListItemText primary={category.title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <Box mt={3}>
            <List>
              {["Become a Seller", "Help Center", "Contact Us"].map(
                (text, index) => (
                  <Link key={index} to="#" className="textColor">
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                )
              )}
            </List>
          </Box>
        </Container>
      </Box>
    </SwipeableDrawer>
  );
};

export default Draw;

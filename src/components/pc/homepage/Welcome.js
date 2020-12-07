import React from "react";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  return (
    <Box
      borderRadius="20px"
      className="background"
      textAlign="center"
      width="19%"
      mx={3}
      my={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="space-between"
    >
      <Box>
        <h1 style={{ fontSize: 20 }}>Welcome to Riltar</h1>
      </Box>
      {props.currentUser.isAuthenticated && (
        <Box borderRadius="20%">
          <Button onClick={props.logout} variant="contained">
            Logout
          </Button>
        </Box>
      )}
      {!props.currentUser.isAuthenticated && (
        <Box
          mt={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
        >
          <Box borderRadius="20%">
            <Link style={{ textDecoration: "none" }} to="/signup">
              <Button className="callToAction" variant="contained">
                Join
              </Button>
            </Link>
          </Box>
          <Box>
            <Link style={{ textDecoration: "none" }} to="/signin">
              <Button style={{ background: "#F9F9F9" }}>Sign in</Button>
            </Link>
          </Box>
        </Box>
      )}
      <Link className="link" to="/sell">
        <Box
          borderRadius="20px"
          mt={2}
          className="callToAction cursor"
          flexGrow={1}
        >
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box textAlign="left">Hey there!</Box>
            <Box textAlign="left">
              <h4>Make money while selling on riltar</h4>
            </Box>
            <Box flexGrow={1}>
              <Box
                letterSpacing={1}
                border={1}
                fontSize={20}
                borderColor="white"
                m={2}
              >
                <h2 style={{ fontSize: 32 }}>Sell</h2>
                <ArrowForwardIcon style={{ fontSize: "50px" }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Welcome;

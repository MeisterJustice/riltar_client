import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const FooterMobile = ({ currentUser, logout }) => {
  return (
    <Box
      bgcolor="#232F3E"
      color="white"
      className="footer"
      height={250}
      borderTop={1}
    >
      <Container>
        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            fontSize="20px"
            flexGrow={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="space-start"
          >
            <Box>
              <Link to="#" className="footer-link">
                Home
              </Link>
            </Box>
            <Box mt={0.5}>
              <Link to="/signin" className="footer-link">
                Sign In
              </Link>
              <span> / </span>
              <Link to="/signup" className="footer-link">
                Sign Up
              </Link>
            </Box>
            <Box mt={0.5}>
              <Link to="#" className="footer-link">
                Help
              </Link>
            </Box>
            <Box mt={0.5}>
              <Link to="#" className="footer-link">
                Contact
              </Link>
            </Box>
            <Box mt={0.5}>
              <Link to="#" className="footer-link">
                Privacy Policy
              </Link>
            </Box>
          </Box>
          <Box mx={3} borderTop={1} mt={2} textAlign="center">
            <Box mt={2}>© 2020 Riltar, Inc. All rights reserved</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterMobile;

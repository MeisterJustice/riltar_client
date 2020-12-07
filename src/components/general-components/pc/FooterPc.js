import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const FooterPc = ({ currentUser, logout }) => {
  return (
    <Box
      bgcolor="#232F3E"
      color="white"
      width={1}
      borderTop={1}
      className="footer"
      height={360}
    >
      <Container>
        <Box mt={7} bgcolor="#232F3E" mb={4}>
          <Box
            width={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box fontSize={14} mr={5} width="40%" flexGrow={1}>
              <Box>
                Rilter strives to be the largest online trading and aunction
                platform in Africa. Now, students in various institutions
                <Box>
                  in Nigeria are able to buy and sell from other students, as
                  well as finding lodges. All done with ease.
                </Box>
              </Box>
              <Box mt={2}>
                Office: Tesmot House, 3 Abdulrahman Okene Close, off Ligali
                Ayorinde Street, Victoria Island, Lagos.
                <Box>
                  0700 933 933 933 (Mon-Fri from 9am-5pm) -
                  contact@piggyvest.com
                </Box>
              </Box>
            </Box>
            <Box
              mr={5}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box color="white">Quick Links</Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Sign In
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Sign Up
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Coupons
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Help
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Support
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Sell with us
                </Link>
              </Box>
            </Box>
            <Box
              mr={5}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box color="white">Company</Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Privacy Policy
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Contact
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Terms of use
                </Link>
              </Box>
              <Box mt={1}>
                <Link to="#" className="footer-link">
                  Advertise with us
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            width={1}
            mt={10}
            borderTop={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt={4}>© 2020 Riltar, Inc. All rights reserved</Box>
            <Box
              mt={4}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Link className="footer-link" to="#">
                  <FacebookIcon mr={5} fontSize="large" />
                </Link>
              </Box>
              <Box>
                <Link className="footer-link" to="#">
                  <TwitterIcon mr={5} fontSize="large" />
                </Link>
              </Box>
              <Box>
                <Link className="footer-link" to="#">
                  <InstagramIcon fontSize="large" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterPc;

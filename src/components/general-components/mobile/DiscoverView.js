import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import NavbarMobile from "./NavbarMobile";
import StarsIcon from "@material-ui/icons/Stars";
import FooterMobile from "./FooterMobile";
import SellButtonMobile from "./SellButtonMobile";
import Currency from "../Currency";

const Discover = (props) => {
  return (
    <Box mb={10} style={{ position: "absolute", width: "100%" }}>
      <NavbarMobile
        {...props}
        currentUser={props.currentUser}
        logout={props.logout}
      />
      <Box className="bg" width={1} style={{ position: "absolute" }}>
        <Container>
          <Box mt={13}>
            <Box py={1.5} bgcolor="#24a5f0" color="#0300be">
              <Box ml={2} fontSize={16} fontWeight="bold">
                {props.discoverMessage}
              </Box>
            </Box>
          </Box>
          <Box mb={15} mt={2}>
            <Box color="grey" fontSize={15}>
              {props.products.length} Results
            </Box>
            <Box mt={2}>
              <Grid container spacing={1}>
                {props.products.map((product, index) => (
                  <Grid key={product._id} xs={6} item>
                    <Link
                      to={`/${product.product.title
                        .split(" ")
                        .join("-")
                        .split("/")
                        .join("-")}/${product.product._id}`}
                      className="link2"
                    >
                      <Paper>
                        <Box mb={1} height={370}>
                          <Box height={200}>
                            <LazyLoad height={200} once>
                              <img
                                alt={product.product.title}
                                title={product.product.title}
                                width="100%"
                                height="200px"
                                className="image2"
                                src={
                                  product.product.images.length > 0
                                    ? product.product.images[0]
                                    : "g.webp"
                                }
                              />
                            </LazyLoad>
                          </Box>
                          <Box mt={1} mx={0.5} fontSize={13}>
                            {product.product.title.substring(0, 35)}...
                          </Box>
                          <Box mx={0.5} fontSize={10} mt={0.7} color="#0077be">
                            {product.product.condition}
                          </Box>
                          <Box
                            mt={0.5}
                            display="flex"
                            flexDirection="row"
                            width={1}
                            justifyContent="space-start"
                            alignItems="center"
                          >
                            <Box>
                              <Rating
                                name="rating"
                                title="rating"
                                defaultValue={product.product.averageRating}
                                size="small"
                                precision={0.5}
                                readOnly
                              />
                            </Box>
                            <Box mb={0.5} mx={0.5} fontSize={13.5}>
                              {" "}
                              ({product.product.ratings.length})
                            </Box>
                          </Box>
                          <Box mx={0.5} fontSize={11}>
                            <Box fontWeight="bold" fontSize={19}>
                              <Currency price={product.product.price} />
                            </Box>
                            <Box
                              fontSize={10.5}
                              color="#B12704"
                              fontWeight={600}
                              mt={0.5}
                            >
                              Only {product.product.quantity} left in stock -
                              Order soon.
                            </Box>
                            <Box
                              fontSize={10.5}
                              style={{ color: "#0077be" }}
                              mt={0.5}
                              display="flex"
                              flexDirection="row"
                              justifyContent="space-start"
                              alignItems="center"
                            >
                              <Box>
                                <StarsIcon />
                              </Box>
                              <Box ml={0.5}>Top Rated Seller</Box>
                            </Box>
                            {product.product.user.feedback > 0 && (
                              <Box mt={1} fontSize={10.5}>
                                {product.product.user.feedback}% positive user
                                feedback
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
        <FooterMobile />
        <SellButtonMobile />
      </Box>
    </Box>
  );
};

export default Discover;

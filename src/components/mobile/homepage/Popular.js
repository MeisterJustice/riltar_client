import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LazyLoad from "react-lazyload";
import Grid from "@material-ui/core/Grid";
import Currency from "../../general-components/Currency";

const Popular = (props) => {
  return (
    <Box mt={5}>
      <Box
        mb={1.5}
        fontSize={16}
        fontWeight="bold"
        width={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box mt={1}>Most Popular Products</Box>
        <Box fontSize={13} fontWeight="fontWeightRegular" mr={3} mt={1}>
          <Link className="link" to="/popular-products">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>See All</Box>
              <Box mt={0.5}>
                <ArrowForwardIcon fontSize="small" />
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
      <Grid width={1} container spacing={1}>
        {props.products.map((product, index) => (
          <Grid key={product._id} ml={1} item xs={3}>
            <Link
              to={`/${product.title
                .split(" ")
                .join("-")
                .split("/")
                .join("-")}/${product._id}`}
              className="textColor"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                bgcolor="white"
              >
                <Box height={100} flexGrow={1}>
                  <LazyLoad height={100} once>
                    <img
                      alt={`product's image`}
                      title={`product's image`}
                      width="100%"
                      height="100%"
                      className="image"
                      src={
                        product.images.length > 0 ? product.images[0] : "g.webp"
                      }
                    />
                  </LazyLoad>
                </Box>
                <Box
                  fontSize={11}
                  fontWeight={600}
                  px={1}
                  pb={1}
                  textAlign="left"
                  color="#B12704"
                >
                  <Currency price={product.price} />
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Popular;

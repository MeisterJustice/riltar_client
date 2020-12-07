import React from "react";
import { Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Currency from "../../general-components/Currency";

const Recent = (props) => {
  return (
    <Box mt={10}>
      {props.products.length > 4 && (
        <Container>
          <Box
            width={1}
            height="370px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              fontSize={30}
              fontWeight="bold"
              width={1}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box ml={3} mt={1}>
                Your Recently Viewed Items
              </Box>
              <Box fontSize={20} fontWeight="fontWeightRegular" mr={3} mt={1}>
                <Link className="link" to="/recently-viewed-products">
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>See All</Box>
                    <Box mt={0.5}>
                      <ArrowForwardIcon />
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Box>
            <Box
              width={1}
              flexGrow={1}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              my={2}
            >
              {props.products.map((product, index) => (
                <Box
                  key={index}
                  className="background-hover"
                  ml={1}
                  width={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  bgcolor="white"
                >
                  <Link
                    to={`/${product.product.title
                      .split(" ")
                      .join("-")
                      .split("/")
                      .join("-")}/${product.product._id}`}
                  >
                    <Box width="235px" height={185} flexGrow={1}>
                      <LazyLoad height={185} once>
                        <img
                          alt={`product`}
                          title={`product`}
                          width="220"
                        height="210"
                          className="image"
                          src={
                            product.product.images.length > 0
                              ? product.product.images[0]
                              : "g.webp"
                          }
                        />
                      </LazyLoad>
                    </Box>
                  </Link>
                  <Link
                    to={`/${product.product.title
                      .split(" ")
                      .join("-")
                      .split("/")
                      .join("-")}/${product.product._id}`}
                    className="textColor"
                  >
                    <Box
                      my={1}
                      fontSize={18}
                      fontWeight={550}
                      textAlign="left"
                      px={1}
                    >
                      <Box color="#0077be" fontSize={14} fontWeight={550}>
                        {product.product.title.substring(0, 50)}
                      </Box>
                      <Box mt={1} color="#B12704" fontWeight={600}>
                        <Currency price={product.product.price} />
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Recent;

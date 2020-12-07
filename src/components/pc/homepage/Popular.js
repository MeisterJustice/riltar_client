import React from "react";
import { Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Currency from "../../general-components/Currency";

const Popular = (props) => {
  return (
    <Box mt={10}>
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
              Most Popular Products
            </Box>
            <Box fontSize={20} fontWeight="fontWeightRegular" mr={3} mt={1}>
              <Link className="link" to="/popular-products">
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
                className="background-hover"
                ml={1}
                key={product._id}
                width={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                bgcolor="white"
              >
                <Link
                  to={`/${product.title
                    .split(" ")
                    .join("-")
                    .split("/")
                    .join("-")}/${product._id}`}
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
                          product.images.length > 0
                            ? product.images[0]
                            : "g.webp"
                        }
                      />
                    </LazyLoad>
                  </Box>
                </Link>
                <Link
                  to={`/${product.title
                    .split(" ")
                    .join("-")
                    .split("/")
                    .join("-")}/${product._id}`}
                  className="textColor"
                >
                  <Box
                    mb={1}
                    pt={2}
                    fontSize={18}
                    fontWeight={550}
                    textAlign="left"
                    px={1}
                  >
                    <Box color="#0077be" fontSize={14.5} fontWeight={550}>
                      {product.title.substring(0, 50)}...
                    </Box>
                    <Box color="#B12704" mt={1} fontWeight={600}>
                      <Currency price={product.price} />
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Popular;

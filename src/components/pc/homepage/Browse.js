import React from "react";
import { Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

import LazyLoad from "react-lazyload";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Currency from "../../general-components/Currency";

const Browse = (props) => {
  return (
    <Box mb={20} mt={10}>
      <Container>
        <Box mb={3} ml={3} fontSize={30} fontWeight="bold">
          Browse Products
        </Box>
        <Grid width={1} container spacing={3}>
          {props.products.map((product, index) => (
            <Grid key={product._id} item xs={3}>
              <Link
                className="link2"
                to={`/${product.title
                  .split(" ")
                  .join("-")
                  .split("/")
                  .join("-")}/${product._id}`}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height={390}
                >
                  <Box flexGrow={1}>
                    <LazyLoad height={350} once>
                      <img
                        alt={`product's image`}
                        title={`product's image`}
                        width="100%"
                        height="100%"
                        className="image"
                        src={
                          product.images.length > 0
                            ? product.images[0]
                            : "g.webp"
                        }
                      />
                    </LazyLoad>
                  </Box>
                  <Box mt={1} fontSize={18} fontWeight={550} textAlign="left">
                    <Box
                      mt={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box color="#0077be" ml={2} fontSize={14}>
                        {product.title.substring(0, 89)}
                      </Box>
                      <Box mr={2} ml={1.9} mt={0.5}>
                        {product.averageRating > 0 && (
                          <Rating
                            name="read-only"
                            defaultValue={product.averageRating}
                            size="small"
                            precision={0.5}
                            readOnly
                          />
                        )}
                      </Box>
                    </Box>
                    <Box
                      my={1}
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Box color="#B12704" ml={2} fontWeight={600}>
                        <Currency price={product.price} />
                      </Box>
                      <Box fontWeight={500} fontSize={13} mr={2}>
                        {product.condition}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Browse;

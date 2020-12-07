import React from "react";

import { Box } from "@material-ui/core";

import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Currency from "../../general-components/Currency";

const SimilarProducts = (props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {props.products.map((product, index) => (
          <Grid key={product._id} item xs={2}>
            <Link
              onClick={props.clickProduct}
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
                height={320}
              >
                <Box flexGrow={1}>
                  <LazyLoad height={180} once>
                    <img
                      alt="product's image"
                      title="product's image"
                      width="100%"
                      height="100%"
                      className="image"
                      src={product.images[0]}
                    />
                  </LazyLoad>
                </Box>
                <Box mt={1} fontSize={13} fontWeight={500} textAlign="left">
                  <Box mt={1}>
                    <Box color="#0077be" ml={1} fontSize={13}>
                      {product.title.substring(0, 64)}
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    flexDirection="column"
                  >
                    <Box mr={2} ml={0.9} mt={0.5}>
                      <Rating
                        name="read-only"
                        defaultValue={product.averageRating}
                        size="small"
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                    <Box
                      mt={2}
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Box color="#B12704" ml={1} fontSize={14}>
                        <Currency price={product.price} />
                      </Box>
                      <Box alignSelf="center" fontSize={9.5} mr={1}>
                        {product.condition}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SimilarProducts;

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
    <Box mt={2}>
      <Box fontWeight={600} fontSize={20}>
        Other Products
      </Box>
      <Box mt={2}>
        <Box>
          <Grid container spacing={1}>
            {props.products.map((product, index) => (
              <Grid key={product._id} item xs={4}>
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
                    height={280}
                  >
                    <Box>
                      <LazyLoad height={120} once>
                        <img
                          alt="product's image"
                          title={product.title}
                          width="100%"
                          height="100%"
                          className="image"
                          src={product.images[0]}
                        />
                      </LazyLoad>
                    </Box>
                    <Box fontSize={13} fontWeight={500} textAlign="left">
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box color="#0077be" ml={1} fontSize={12}>
                          {product.title.substring(0, 54)}
                        </Box>
                        <Box mr={1} ml={0.9} mt={0.5}>
                          <Rating
                            name="read-only"
                            defaultValue={product.averageRating}
                            size="small"
                            precision={0.5}
                            readOnly
                          />
                        </Box>
                      </Box>

                      <Box
                        color="#B12704"
                        mt={0.5}
                        fontWeight={600}
                        fontSize={13}
                        ml={1}
                      >
                        <Currency price={product.price} />
                      </Box>
                      <Box my={0.8} fontSize={10.5} ml={1}>
                        {product.condition}
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SimilarProducts;

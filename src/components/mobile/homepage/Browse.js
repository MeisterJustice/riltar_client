import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Currency from "../../general-components/Currency";

const Browse = (props) => {
  return (
    <Box mb={10} mt={5}>
      <Box mb={1.5} fontSize={16} fontWeight="bold">
        Browse Products
      </Box>
      <Grid width={1} container spacing={2}>
        {props.products.map((product, index) => (
          <Grid key={product._id} ml={1} item xs={6}>
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
              >
                <Box height={180} flexGrow={1}>
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
                <Box my={1} fontSize={13} fontWeight={550} textAlign="left">
                  <Box
                    mt={2}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box color="#0077be" ml={1} fontSize={14}>
                      {product.title.substring(0, 30)}
                    </Box>
                    <Box ml={1}>
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
                    mt={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box fontSize={16} color="#B12704" ml={1} fontWeight={600}>
                      <Currency price={product.price} />
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

export default Browse;

import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarsIcon from "@material-ui/icons/Stars";
import { Divider } from "@material-ui/core";
import Currency from "../../Currency";

const RightGrid = (props) => {
  return (
    <Box>
      <Box color="grey" fontSize={15} mx={2}>
        {props.products.length} Results
      </Box>
      {props.products.map((product, index) => (
        <Box my={2} mx={2} key={product._id}>
          <Box bgcolor="white" borderRadius={20} width={1}>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Link
                    to={`/${product.product.title
                      .split(" ")
                      .join("-")
                      .split("/")
                      .join("-")}/${product.product._id}`}
                    className="link2"
                  >
                    <Box height={230}>
                      <LazyLoad height={220} once>
                        <img
                          alt={product.product.title}
                          title={product.product.title}
                          width="100%"
                          height="220px"
                          className="image2"
                          src={
                            product.product.images.length > 0
                              ? product.product.images[0]
                              : "g.webp"
                          }
                        />
                      </LazyLoad>
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Box ml={2}>
                      <Link
                        to={`/${product.product.title
                          .split(" ")
                          .join("-")
                          .split("/")
                          .join("-")}/${product.product._id}`}
                        className="link2"
                      >
                        <Box fontSize={18.5}>
                          {product.product.title.substring(0, 45)}...
                        </Box>
                        <Box fontSize={13} mt={1} color="#0077be">
                          Condition : {product.product.condition}
                        </Box>
                        {product.product.averageRating > 0 && (
                          <Box
                            mt={1}
                            display="flex"
                            flexDirection="row"
                            width={1}
                            justifyContent="space-start"
                            alignItems="center"
                          >
                            <Box>
                              <Rating
                                name="read-only"
                                defaultValue={product.product.averageRating}
                                size="small"
                                precision={0.5}
                                readOnly
                              />
                            </Box>
                            <Box ml={1} mb={0.3} fontSize={13}>
                              ({product.product.ratings.length} ratings)
                            </Box>
                          </Box>
                        )}
                        <Box fontWeight="bold" fontSize={20} mt={1}>
                          <Currency price={product.product.price} />
                        </Box>
                      </Link>
                      <Box
                        fontSize={13}
                        color="rgb(73, 73, 73)"
                        mt={0.5}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-start"
                      >
                        <Box>
                          {product.product.isNegotiable && (
                            <Box>Negotiable</Box>
                          )}
                          <Box color="#B12704" fontWeight={600} mt={0.5}>
                            Only {product.product.quantity} item remaining in
                            stock - Order soon.
                          </Box>
                        </Box>
                        {product.product.user.firstName && (
                          <Box ml={10}>
                            <Box mt={1}>
                              Sold by; {product.product.user.firstName}{" "}
                              {product.product.user.lastName}
                            </Box>
                            <Box
                              style={{ color: "#0077be" }}
                              mt={1}
                              display="flex"
                              flexDirection="row"
                              justifyContent="space-start"
                              alignItems="center"
                            >
                              <Box>
                                <StarsIcon />
                              </Box>
                              <Box ml={1}>Top Rated Seller</Box>
                            </Box>
                            {product.product.user.feedback > 0 && (
                              <Box mt={1}>
                                {product.product.user.feedback}% positive user
                                feedback
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box my={4}>
            <Divider />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RightGrid;

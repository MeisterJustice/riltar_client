import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import StarsIcon from "@material-ui/icons/Stars";
import Empty from "../../../pc/profile/components/Empty";
import Currency from "../../../general-components/Currency";

const WishListItem = (props) => {
  return (
    <Box>
      {props.favorites.length < 1 ? (
        <Empty text="There's Nothing Here" />
      ) : (
        <Grid container spacing={1}>
          {props.favorites.map((fav) => (
            <Grid key={fav._id} xs={6} item>
              <Link
                to={`/${fav.product.title
                  .split(" ")
                  .join("-")
                  .split("/")
                  .join("-")}/${fav.product.id}`}
                className="link2"
              >
                <Paper>
                  <Box mb={1} height={370}>
                    <Box height={200}>
                      <LazyLoad height={200} once>
                        <img
                          alt={fav.product.title}
                          title={fav.product.title}
                          width="100%"
                          height="200px"
                          className="image2"
                          src={fav.product.images[0]}
                        />
                      </LazyLoad>
                    </Box>
                    <Box mt={1} mx={0.5} fontSize={13}>
                      {fav.product.title.substring(0, 42)}...
                    </Box>
                    <Box mx={0.5} fontSize={10} mt={0.7} color="#0077be">
                      {fav.product.condition}
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
                          defaultValue={fav.product.averageRating}
                          size="small"
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                      <Box mb={0.5} mx={0.5} fontSize={13.5}>
                        {" "}
                        ({fav.product.ratings.length})
                      </Box>
                    </Box>
                    <Box mx={0.5} fontSize={11}>
                      <Box fontWeight="bold" fontSize={19}>
                        <Currency price={fav.product.price} />
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
                      <Box mt={0.5}>
                        {fav.product.user.feedback}% positive user feedback
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishListItem;

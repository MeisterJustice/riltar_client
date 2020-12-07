import React from "react";

import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import CancelIcon from "@material-ui/icons/Cancel";
import StarsIcon from "@material-ui/icons/Stars";
import { Divider } from "@material-ui/core";
import Empty from "../components/Empty";
import Currency from "../../../general-components/Currency";
import { connect } from "react-redux";
import { removeAFavorite } from "../../../../store/actions/wishlist";
import SimpleBackdrop from "../../../general-components/Backdrop";

const Item = (props) => {
  const [open, setOpen] = React.useState(false);
  async function removeFav(favorite_id) {
    await setOpen(true);
    await removeAFavorite(props.currentUser.user.id, favorite_id);
    setOpen(false);
  }
  const onRemove = (favorite_id) => {
    removeFav(favorite_id);
  };
  return (
    <Box>
      {props.favorites.length < 1 ? (
        <Empty text="There's Nothing Here" />
      ) : (
        props.favorites.map((fav) => (
          <Box key={fav._id} my={2} mx={2}>
            <Paper>
              <Box bgcolor="white" width={1}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Link
                        to={`/${fav.product.title
                          .split(" ")
                          .join("-")
                          .split("/")
                          .join("-")}/${fav.product.id}`}
                        className="link2"
                      >
                        <Box height="90%">
                          <LazyLoad height="100%" once>
                            <img
                              alt={fav.product.title}
                              title={fav.product.title}
                              width="100%"
                              height="50%"
                              className="image2"
                              src={fav.product.images[0]}
                            />
                          </LazyLoad>
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        <Box>
                          <Link
                            to={`/${fav.product.title
                              .split(" ")
                              .join("-")
                              .split("/")
                              .join("-")}/${fav.product.id}`}
                            className="link2"
                          >
                            <Box fontSize={16}>
                              {fav.product.title.substring(0, 55)}
                            </Box>
                            <Box fontSize={13} mt={1} color="#0077be">
                              Condition : {fav.product.condition}
                            </Box>
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
                                  name="rating"
                                  title="rating"
                                  defaultValue={fav.product.averageRating}
                                  size="small"
                                  precision={0.5}
                                  readOnly
                                />
                              </Box>
                              <Box ml={1} mb={0.3} fontSize={13}>
                                ({fav.product.ratings.length} ratings)
                              </Box>
                            </Box>
                          </Link>
                          <Box
                            fontSize={13}
                            color="rgb(73, 73, 73)"
                            mt={1}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-start"
                          >
                            <Box>
                              <Box fontWeight="bold" fontSize={18} mt={1}>
                                <Currency price={fav.product.price} />
                              </Box>
                              <Box mt={1}>
                                {fav.product.isNegotiable ? "Negotiable" : ""}
                              </Box>
                              <Box mt={1}>{fav.product.quantity} remaining</Box>
                            </Box>
                            <Box ml={10}>
                              <Box mt={1}>
                                {fav.product.user.firstName}{" "}
                                {fav.product.user.lastName}
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
                              <Box mt={1}>
                                {fav.product.user.feedback}% positive user
                                feedback
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Box>
                        <CancelIcon
                          className="cursor"
                          style={{ color: "red" }}
                          onClick={onRemove(fav._id)}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
            <Box my={4}>
              <Divider />
            </Box>
          </Box>
        ))
      )}
      <SimpleBackdrop backdropOpen={open} />
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    favorites: state.favorites,
  };
}

export default connect(mapStateToProps, {
  removeAFavorite,
})(Item);

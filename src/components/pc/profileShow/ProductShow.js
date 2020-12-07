import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { authUser } from "../../../store/actions/auth";
import { fetchBrowseProducts } from "../../../store/actions/products";
import { fetchCart, postCart } from "../../../store/actions/cart";
import Grid from "@material-ui/core/Grid";
import { postRoom } from "../../../store/actions/message";

import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Snackbars from "../../general-components/Snackbar";
import SimpleBackdrop from "../../general-components/Backdrop";
import StarsIcon from "@material-ui/icons/Stars";
import { Container, makeStyles, Avatar } from "@material-ui/core";
import NavbarPc from "../../general-components/pc/NavbarPc";
import ImageGallery from "react-image-gallery";
import "react-tabs/style/react-tabs.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import FooterPc from "../../general-components/pc/FooterPc";
import OfferInput from "./OfferInput";
import TabsComponent from "./Tabs";
import SimilarProducts from "./SimilarProducts";
import Currency from "../../general-components/Currency";
import Login from "./Login";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const ProductShowPc = (props) => {
  const classes = useStyles();
  const [donePost, setDonePost] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Product Has Been Added To Cart");
  const [done, setDone] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen1, setSnackbarOpen1] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setBackdropOpen(true);
  };
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const openSnackbar1 = () => {
    setSnackbarOpen1(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  const closeSnackbar1 = () => {
    setSnackbarOpen1(false);
  };
  const images = [];
  props.product.images.map((image, index) => {
    let item = {
      original: image,
      thumbnail: image,
      originalAlt: "thumbnail",
      thumbnailAlt: "click to slide",
      originalTitle: `image ${index}`,
      thumbnailTitle: `thumbnail ${index}`,
    };
    images.push(item);
  });

  async function fetch() {
    await props.fetchCart(props.currentUser.user.id);
    await props.fetchBrowseProducts(12);
    await setDone(true);
  }

  const clickProduct = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    fetch();
  }, []);

  async function submitCart() {
    await openBackdrop();
    await props
      .postCart({}, props.currentUser.user.id, props.product._id)
      .then(() => {
        setDonePost(true);
        closeBackdrop();
        openSnackbar();
      })
      .catch(() => {
        setSeverity("error");
        closeBackdrop();
        openSnackbar();
        return;
      });
  }

  async function submitCartAndCheckout() {
    await openBackdrop();
    await props
      .postCart({}, props.currentUser.user.id, props.product._id)
      .then(() => {
        setDonePost(true);
        closeBackdrop();
        openSnackbar();
        setTimeout(() => {
          props.history.push(`/checkout/${props.cart_item._id}`);
        }, 300);
      })
      .catch(() => {
        setSeverity("error");
        closeBackdrop();
        openSnackbar();
        return;
      });
  }

  const addToCart = () => {
    if (!props.currentUser.isAuthenticated) {
      handleClickOpen();
    } else {
      submitCart();
    }
  };

  const checkout = () => {
    if (!props.currentUser.isAuthenticated) {
      handleClickOpen();
    } else {
      submitCartAndCheckout();
    }
  };
  return (
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <NavbarPc cartItem={props.cart} {...props} />
      <Box my={13}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Box
                color="#282828"
                className="productBackground"
                width={1}
                height={670}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box ml={1} width={1} height={500}>
                      <ImageGallery
                        items={images}
                        LazyLoad={true}
                        showPlayButton={false}
                        showFullscreenButton={true}
                      />
                    </Box>
                    <Box ml={1} mt={10} width={1} height={100}>
                      <Box textAlign="center" fontWeight="bold">
                        SHARE WITH FRIENDS
                      </Box>
                      <Box
                        mt={1}
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <TwitterShareButton url={window.location.href}>
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <FacebookShareButton url={window.location.href}>
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton url={window.location.href}>
                          <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box mr={1} width={1} height={500}>
                      <Box mt={1.3} mr={1.3} fontSize={24}>
                        {props.product.title}
                      </Box>
                      <Box fontSize={13.5} mt={1} color="#0077be">
                        Condition : {props.product.condition}
                      </Box>
                      <Box fontSize={13.5} mt={1} color="#0077be">
                        Subcategory {">>"} {props.product.subcategory.title}
                      </Box>
                      <Box fontSize={13.5} mt={1} color="#0077be">
                        Category {">>"}
                        {props.product.subcategory.category.title}
                      </Box>
                      {!props.product.isNegotiable && (
                        <Box>
                          <Box
                            color="#B12704"
                            mt={1}
                            fontSize={26}
                            fontWeight="bold"
                          >
                            <Currency price={props.product.price} />
                          </Box>
                          <Box
                            mt={1}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-start"
                            alignContent="center"
                          >
                            <Rating
                              name="rating"
                              title="rating"
                              defaultValue={props.product.averageRating}
                              size="small"
                              precision={0.5}
                              readOnly
                            />
                            {props.product.ratings.length > 0 ? (
                              <Box fontSize={13.5} ml={1}>
                                ({props.product.ratings.length} product ratings)
                              </Box>
                            ) : (
                              <Box fontSize={13.5} ml={1}>
                                (No Rating Yet)
                              </Box>
                            )}
                          </Box>
                          <Box fontSize={13.5} mt={1} color="#0077be">
                            {props.product.totalOrders > 0 && (
                              <Box display="inline">
                                {props.product.totalOrders} Sold /{" "}
                              </Box>
                            )}
                            <Link style={{ color: "#0077be" }} to="#reviews">
                              See Reviews
                            </Link>
                          </Box>
                          {props.product.user._id !==
                            props.currentUser.user.id && (
                            <Box
                              my={2}
                              display="flex"
                              flexDirection="column"
                              justifyContent="flex-start"
                            >
                              <Box>
                                <Button
                                  disabled={
                                    props.currentUser.user.id ===
                                    props.product.user._id
                                      ? true
                                      : donePost
                                  }
                                  onClick={addToCart}
                                  size="large"
                                  fullWidth
                                  variant="contained"
                                  className="callToAction"
                                >
                                  {props.currentUser.user.id ===
                                  props.product.user._id
                                    ? "Product Owner"
                                    : donePost
                                    ? "Added To Cart"
                                    : "Add To Cart"}
                                </Button>
                              </Box>
                              <Box mt={2}>
                                <Button
                                  disabled={
                                    props.currentUser.user.id ===
                                    props.product.user._id
                                      ? true
                                      : donePost
                                  }
                                  onClick={checkout}
                                  size="large"
                                  fullWidth
                                  variant="contained"
                                  className="callToAction2"
                                >
                                  {props.currentUser.user.id ===
                                  props.product.user._id
                                    ? "Product Owner"
                                    : donePost
                                    ? "Added To Cart"
                                    : "Buy Now"}
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}
                      {props.product.isNegotiable && (
                        <Box
                          bgcolor="#F5F5F5"
                          border={1}
                          borderColor="#ff6600"
                          p={1}
                          mt={1}
                          mr={1}
                        >
                          <Box fontSize={13.5} color="#0077be">
                            Negotiable
                          </Box>
                          <Box
                            color="#B12704"
                            mt={1}
                            fontSize={24}
                            fontWeight="bold"
                          >
                            <Currency price={props.product.price} />
                          </Box>
                          <Box
                            mt={1}
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-start"
                            alignContent="center"
                          >
                            <Rating
                              name="rating"
                              title="rating"
                              defaultValue={props.product.averageRating}
                              size="small"
                              precision={0.5}
                              readOnly
                            />
                            {props.product.ratings.length > 0 ? (
                              <Box fontSize={13.5} ml={1}>
                                ({props.product.ratings.length} product ratings)
                              </Box>
                            ) : (
                              <Box fontSize={13.5} ml={1}>
                                (No Rating Yet)
                              </Box>
                            )}
                          </Box>
                          <Box fontSize={13.5} mt={1} color="#0077be">
                            {props.product.totalOrders > 0 && (
                              <Box>{props.product.totalOrders} Sold / </Box>
                            )}
                            <Link style={{ color: "#0077be" }} to="#">
                              See Reviews
                            </Link>{" "}
                            / {props.product.bids} bids
                          </Box>
                          <OfferInput
                            product={props.product}
                            {...props}
                            postRoom={props.postRoom}
                            handleNegotiationOpen={props.handleNegotiationOpen}
                          />
                        </Box>
                      )}

                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Box fontWeight={500} mt={1} fontSize={13.5}>
                            Shipping :
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <Box mt={1} fontSize={13.5} mr={1}>
                            On checkout, seller will contact you to arrange
                            shipping
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Box fontWeight={500} mt={1} fontSize={13.5}>
                            Delivery :
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <Box mt={1} fontSize={13.5}>
                            Within 2 days
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Box fontWeight={500} mt={1} fontSize={13.5}>
                            Cancellation :
                          </Box>
                        </Grid>
                        <Grid item xs={9}>
                          <Box mt={1} fontSize={13.5}>
                            Money back guarantee on order cancellation
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={5}>
                <TabsComponent product={props.product} />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box boxShadow={2} className="productBackground" height={400}>
                <Box textAlign="center" py={1} fontSize={20}>
                  Seller
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                  mx={1}
                  height="170px"
                >
                  <LazyLoad height="170px" once>
                    <Avatar
                      className={classes.large}
                      alt={`${props.product.user.firstName} ${props.product.user.lastName}`}
                      src={props.product.user.profilePicture}
                    />
                  </LazyLoad>
                </Box>
                <Box fontSize={16} mt={1} textAlign="center">
                  {props.product.user.firstName} {props.product.user.lastName}
                </Box>
                <Box fontSize={14} mt={1} textAlign="center">
                  {props.product.user.username}
                </Box>
                {props.product.user.isBusiness && (
                  <Box fontSize={14} mt={1} textAlign="center">
                    Business
                  </Box>
                )}
                {props.product.user.feedback > 0 && (
                  <Box fontSize={14} mt={1} color="#0077be" textAlign="center">
                    {props.product.user.feedback}% positive user feedback
                  </Box>
                )}

                <Box
                  color="#0077be"
                  mt={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <StarsIcon fontSize="small" />
                  </Box>
                  <Box ml={1} fontSize={14}>
                    top rated seller
                  </Box>
                </Box>
                <Box mt={1} mx={1}>
                  <Link style={{ textDecoration: "none" }} to="#">
                    <Button size="small" fullWidth variant="contained">
                      See Profile
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box py={3} mt={5} color="#282828" width={1}>
            <Box mx={2} fontWeight={600} fontSize={23}>
              Other Products
            </Box>
            <Box mt={2} mx={2}>
              {done && (
                <SimilarProducts
                  clickProduct={clickProduct}
                  products={props.browse}
                />
              )}
            </Box>
          </Box>
          <Login
            openSnackbar1={openSnackbar1}
            openBackdrop={openBackdrop}
            closeBackdrop={closeBackdrop}
            onAuth={props.authUser}
            errors={props.errors}
            open={open}
            handleClose={handleClose}
          />
        </Container>
      </Box>
      <FooterPc />
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message={
          severity === "success"
            ? message
            : "Product Not Available At This Time!"
        }
        severity={severity}
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
      <Snackbars
        message={`Welcome Back ${props.currentUser.user.firstName}`}
        severity="success"
        open={snackbarOpen1}
        handleClose={closeSnackbar1}
        position="right"
      />
      <Snackbars
        severity="success"
        open={props.open}
        handleClose={props.handleClose}
        message={props.message}
      />
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    browse: state.browse,
    cart: state.cart,
    cart_item: state.cart_item,
  };
}

export default connect(mapStateToProps, {
  fetchBrowseProducts,
  fetchCart,
  postCart,
  authUser,
  postRoom,
})(ProductShowPc);

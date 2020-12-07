import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBrowseProducts } from "../../../store/actions/products";
import { fetchCart, postCart } from "../../../store/actions/cart";
import { postRoom } from "../../../store/actions/message";
import { authUser } from "../../../store/actions/auth";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Snackbars from "../../general-components/Snackbar";
import { Container } from "@material-ui/core";
import ImageGallery from "react-image-gallery";
import "react-tabs/style/react-tabs.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import NavbarMobile from "../../general-components/mobile/NavbarMobile";
import FooterMobile from "../../general-components/mobile/FooterMobile";
import OfferInput from "./OfferInput";
import TabsComponent from "./Tabs";
import SimilarProducts from "./SimilarProducts";
import Currency from "../../general-components/Currency";
import SimpleBackdrop from "../../general-components/Backdrop";
import Login from "../../pc/profileShow/Login";

const ProductShowMobile = (props) => {
  const [done, setDone] = useState(false);
  const [donePost, setDonePost] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("Product Has Been Added To Cart");
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
    await props.fetchBrowseProducts(9);
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

  const checkout = () => {
    if (!props.currentUser.isAuthenticated) {
      handleClickOpen();
    } else {
      submitCartAndCheckout();
    }
  };

  const addToCart = () => {
    if (!props.currentUser.isAuthenticated) {
      handleClickOpen();
    } else {
      submitCart();
    }
  };
  return (
    <Box mb={10} style={{ position: "absolute", width: "100%" }}>
      <NavbarMobile
        cartItem={props.cart}
        {...props}
        currentUser={props.currentUser}
        logout={props.logout}
      />
      <Box className="bg" mt={11} width={1} style={{ position: "absolute" }}>
        <Box width={1} height={450}>
          <ImageGallery
            items={images}
            showPlayButton={false}
            LazyLoad={true}
            showFullscreenButton={true}
          />
        </Box>
        <Box mt={7} mb={10}>
          <Container>
            <Box boxShadow={2} bgcolor="white" p={1.5}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="space-between"
              >
                <Box color="#B12704" fontSize={27} fontWeight="bold">
                  <Currency price={props.product.price} />
                </Box>
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
              <Box mt={1} fontSize={19} fontWeight={550}>
                {props.product.title}
              </Box>
              <Box fontSize={14.5} mt={1} color="#0077be">
                Condition : {props.product.condition}
              </Box>
              <Box fontSize={14.5} mt={1} color="#0077be">
                Subcategory {">>"} {props.product.subcategory.title}
              </Box>
              <Box fontSize={14.5} mt={1} color="#0077be">
                Category {">>"}
                {props.product.subcategory.category.title}
              </Box>
              {!props.product.isNegotiable && (
                <Box mt={1}>
                  <Box fontSize={14.5} mt={1} color="#0077be">
                    {props.product.totalOrders > 0 && (
                      <Box display="inline">
                        {props.product.totalOrders} Sold /{" "}
                      </Box>
                    )}
                    <Link style={{ color: "#0077be" }} to="#">
                      See Reviews
                    </Link>{" "}
                  </Box>
                  {props.product.user._id !== props.currentUser.user.id && (
                    <Box>
                      <Box mt={2}>
                        <Button
                          disabled={
                            props.currentUser.user.id === props.product.user._id
                              ? true
                              : donePost
                          }
                          onClick={addToCart}
                          size="large"
                          fullWidth
                          variant="contained"
                          className="callToAction"
                        >
                          {props.currentUser.user.id === props.product.user._id
                            ? "Owner"
                            : donePost
                            ? "Added To Cart"
                            : "Add To Cart"}
                        </Button>
                      </Box>
                      <Box mt={1.5}>
                        <Button
                          disabled={
                            props.currentUser.user.id === props.product.user._id
                              ? true
                              : donePost
                          }
                          onClick={checkout}
                          size="large"
                          fullWidth
                          variant="contained"
                          className="callToAction2"
                        >
                          {props.currentUser.user.id === props.product.user._id
                            ? "Owner"
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
                <Box mt={1}>
                  <Box fontSize={14.5} color="#0077be">
                    Negotiable
                  </Box>
                  <Box fontSize={14.5} mt={1} color="#0077be">
                    {props.product.totalOrders > 0 && (
                      <Box>{props.product.totalOrders} Sold / </Box>
                    )}
                    <Link style={{ color: "#0077be" }} to="#">
                      See Reviews
                    </Link>{" "}
                    / {props.product.bids} bids
                  </Box>
                  <Box mt={2}>
                    <OfferInput
                      product={props.product}
                      {...props}
                      postRoom={props.postRoom}
                      handleNegotiationOpen={props.handleNegotiationOpen}
                    />
                  </Box>
                </Box>
              )}
              <Box mt={4} width={1} height={70}>
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

              <Box mt={2.5} fontWeight={500}>
                <Box>
                  <Box fontSize={17}>Shipping</Box>
                  <Box fontSize={16} mt={1}>
                    On checkout, seller will contact you to arrange shipping
                  </Box>
                </Box>
                <Box mt={2}>
                  <Box fontSize={17}>Delivery</Box>
                  <Box fontSize={16} mt={1}>
                    Within 2 days
                  </Box>
                </Box>
                <Box mt={2}>
                  <Box fontSize={17}>Cancellation</Box>
                  <Box fontSize={16} mt={1}>
                    Money back guarantee on order cancellation
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box boxShadow={2} bgcolor="white" p={1.5} mt={3}>
              <TabsComponent product={props.product} />
            </Box>
            <Box mt={3} width={1}>
              <SimilarProducts
                clickProduct={clickProduct}
                products={props.browse}
              />
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
        <FooterMobile />
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
  postRoom,
  postCart,
  authUser,
})(ProductShowMobile);

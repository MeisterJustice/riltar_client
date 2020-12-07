import React, { useState } from "react";
import { Box, Container, Paper, Button, Grid } from "@material-ui/core";
import NavbarMobile from "../general-components/mobile/NavbarMobile";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import LazyLoad from "react-lazyload";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import FooterMobile from "../general-components/mobile/FooterMobile";
import SellButtonMobile from "../general-components/mobile/SellButtonMobile";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleBackdrop from "../general-components/Backdrop";
import Currency from "../general-components/Currency";

const CartMobile = (props) => {
  const [backdropOpen, setBackdropOpen] = useState(false);

  const openBackdrop = () => {
    setBackdropOpen(true);
  };
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };

  const deleteCart = (cart_id) => {
    openBackdrop();
    props.removeACart(props.currentUser.user.id, cart_id).then(() => {
      closeBackdrop();
    });
  };

  const updateCart = (cart_id, quantity, status) => {
    if (status !== "add" && quantity === 1) {
      return;
    }
    openBackdrop();
    props
      .updateCartItem(
        { quantity: status === "add" ? quantity + 1 : quantity - 1 },
        props.currentUser.user.id,
        cart_id
      )
      .then(() => {
        closeBackdrop();
      });
  };
  return (
    <Box mb={10} style={{ position: "absolute", width: "100%" }}>
      <NavbarMobile
        cartItem={props.cart}
        currentUser={props.currentUser}
        logout={props.logout}
      />
      <Box className="bg" width={1} style={{ position: "absolute" }}>
        <Container>
          <Box mt={15}>
            <Box>
              <Paper elevation={3}>
                <Box
                  height={90}
                  display="flex"
                  justifyContent="center"
                  alignItems="space-start"
                  flexDirection="column"
                  ml={5}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: "22px" }}>
                    Your Shopping Cart
                  </h1>
                  <Box mt={1} fontSize={18} fontWeight={600}>
                    {props.cart.length}{" "}
                    {props.cart.length > 1 ? "products" : "product"} in cart
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box mt={5}>
            {props.cart.map((cart, index) => (
              <Box mt={4} key={cart._id}>
                <Paper elevation={3}>
                  <Box height={200} pb={1} borderRadius={10}>
                    <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <Box ml={0.5} height={30}>
                          <LazyLoad height={30} once>
                            <img
                              alt={`product's image`}
                              title={`product's image`}
                              width="100%"
                              height="100%"
                              className="image"
                              src={cart.product.images[0]}
                            />
                          </LazyLoad>
                        </Box>
                      </Grid>
                      <Grid item xs={7}>
                        <Box mr={1}>
                          <Box>
                            <Link
                              className="link2"
                              to={`/${cart.product.title
                                .split(" ")
                                .join("-")
                                .split("/")
                                .join("-")}/${cart.product._id}`}
                            >
                              <Box mt={1} fontWeight={500}>
                                {cart.product.title.substring(0, 35)}...
                              </Box>
                              <Box fontSize={13} mt={0.5} fontWeight={600}>
                                Seller:{" "}
                                {cart.product.user.isBusiness
                                  ? cart.product.user.username
                                  : `${cart.product.user.firstName} ${cart.product.user.lastName}`}
                              </Box>
                            </Link>
                          </Box>
                          <Box mt={2}>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/checkout/${cart._id}`}
                            >
                              <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                className="callToAction"
                              >
                                Buy Item
                              </Button>
                            </Link>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box
                      mt={2}
                      mx={1}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box className="cursor">
                        <DeleteIcon
                          onClick={() => deleteCart(cart._id)}
                          fontSize="large"
                        />
                      </Box>
                      <Box>
                        <Box fontWeight={600} fontSize={15}>
                          Unit Price
                        </Box>
                        <Box mt={1} fontSize={14} fontWeight={550}>
                          <Currency price={cart.price} />
                        </Box>
                      </Box>
                      <Box>
                        <Box fontWeight={600} fontSize={16}>
                          Quantity
                        </Box>
                        <Box
                          mt={1}
                          fontSize={16}
                          fontWeight={550}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box className="cursor">
                            <RemoveCircleIcon
                              onClick={() =>
                                updateCart(cart._id, cart.quantity, "minus")
                              }
                            />
                          </Box>
                          <Box>{cart.quantity}</Box>
                          <Box className="cursor">
                            <AddCircleIcon
                              onClick={() =>
                                updateCart(cart._id, cart.quantity, "add")
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box fontWeight={600} fontSize={15}>
                          Subtotal
                        </Box>
                        <Box mt={1} fontSize={14} fontWeight={550}>
                          <Currency price={cart.totalPrice} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
          <Box mb={10} mt={10}>
            <Box mb={2} fontSize={25} fontWeight={600}>
              Browse Products
            </Box>
            <Grid container spacing={2}>
              {props.products.map((product, index) => (
                <Grid key={product._id} item xs={6}>
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
                      height={280}
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
                      <Box
                        mt={1}
                        fontSize={13}
                        fontWeight={500}
                        textAlign="left"
                      >
                        <Box
                          mt={1}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Box color="#0077be" ml={2} fontSize={13}>
                            {product.title.substring(0, 45)}...
                          </Box>
                          <Box mr={2} ml={1.9} mt={0.5}>
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
                          my={1}
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Box fontSize={15} color="#B12704" ml={2}>
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
        </Container>
        <FooterMobile />
        <SellButtonMobile />
      </Box>
      <SimpleBackdrop backdropOpen={backdropOpen} />
    </Box>
  );
};

export default CartMobile;

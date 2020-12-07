import React, { Component, useState } from "react";
import { Box, Grid, Paper, Button } from "@material-ui/core";
import NavbarPc from "../general-components/pc/NavbarPc";
import LazyLoad from "react-lazyload";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import FooterPc from "../general-components/pc/FooterPc";
import DeleteIcon from "@material-ui/icons/Delete";
import Currency from "../general-components/Currency";
import SimpleBackdrop from "../general-components/Backdrop";

const CartPc = (props) => {
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
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <NavbarPc cartItem={props.cart} {...props} />
      <Box pb={20} mt={20}>
        <Box mx={10}>
          <Grid spacing={1} container>
            <Grid item xs={8}>
              <Paper elevation={3}>
                <Box
                  width={1}
                  height={100}
                  display="flex"
                  justifyContent="center"
                  alignItems="space-start"
                  flexDirection="column"
                  ml={5}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
                    Your Shopping Cart
                  </h1>
                  <Box mt={1} fontSize={18} fontWeight={600}>
                    {props.cart.length}{" "}
                    {props.cart.length > 1 ? "products" : "product"} in cart
                  </Box>
                </Box>
              </Paper>
              <Box mt={7}>
                {props.cart.map((cart, index) => (
                  <Box mt={4} key={cart._id}>
                    <Paper elevation={3}>
                      <Box height={230}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <Link
                              className="link2"
                              to={`/${cart.product.title
                                .split(" ")
                                .join("-")
                                .split("/")
                                .join("-")}/${cart.product._id}`}
                            >
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
                            </Link>
                            <Box
                              className="cursor"
                              display="flex"
                              justifyContent="center"
                              mt={18}
                            >
                              <DeleteIcon
                                onClick={() => deleteCart(cart._id)}
                                fontSize="large"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={7}>
                            <Box>
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
                                    {cart.product.title}
                                  </Box>
                                  <Box mt={0.5} fontWeight={600}>
                                    Seller:{" "}
                                    {cart.product.user.isBusiness
                                      ? cart.product.user.username
                                      : `${cart.product.user.firstName} ${cart.product.user.lastName}`}
                                  </Box>
                                </Link>
                              </Box>
                              <Box
                                mt={2}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Box>
                                  <Box
                                    fontWeight="fontWeightLight"
                                    fontSize={18}
                                  >
                                    Unit Price
                                  </Box>
                                  <Box
                                    mt={0.2}
                                    bgcolor="gray"
                                    height="1px"
                                    width="80px"
                                  />
                                  <Box mt={1} fontSize={18} fontWeight={500}>
                                    <Currency price={cart.price} />
                                  </Box>
                                </Box>
                                <Box>
                                  <Box
                                    fontWeight="fontWeightLight"
                                    fontSize={18}
                                  >
                                    Quantity
                                  </Box>
                                  <Box
                                    mt={0.2}
                                    bgcolor="gray"
                                    height="1px"
                                    width="80px"
                                  />
                                  <Box
                                    mt={1}
                                    fontSize={18}
                                    fontWeight={500}
                                    display="flex"
                                    justifyContent="space-between"
                                  >
                                    <Box className="cursor">
                                      <RemoveCircleIcon
                                        onClick={() =>
                                          updateCart(
                                            cart._id,
                                            cart.quantity,
                                            "minus"
                                          )
                                        }
                                      />
                                    </Box>
                                    <Box>{cart.quantity}</Box>
                                    <Box className="cursor">
                                      <AddCircleIcon
                                        onClick={() =>
                                          updateCart(
                                            cart._id,
                                            cart.quantity,
                                            "add"
                                          )
                                        }
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                                <Box>
                                  <Box
                                    fontWeight="fontWeightLight"
                                    fontSize={18}
                                  >
                                    Subtotal
                                  </Box>
                                  <Box
                                    mt={0.2}
                                    bgcolor="gray"
                                    height="1px"
                                    width="80px"
                                  />
                                  <Box mt={1} fontSize={18} fontWeight={500}>
                                    <Currency price={cart.totalPrice} />
                                  </Box>
                                </Box>
                              </Box>
                              <Box mt={2}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/checkout/${cart._id}`}
                                >
                                  <Button
                                    size="medium"
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
                          <Grid item xs={2}></Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
        <Box mt={10} mx={10}>
          <Box mb={2} fontSize={28} fontWeight={550}>
            Browse Products
          </Box>
          <Grid container spacing={1}>
            {props.products.map((product, index) => (
              <Grid key={product._id} item xs={2}>
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
                    height={300}
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
                      <Box
                        mt={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box color="#0077be" ml={2} fontSize={13}>
                          {product.title.substring(0, 45)}
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
                        <Box
                          fontSize={16}
                          fontWeight={600}
                          ml={2}
                          color="#B12704"
                        >
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
      </Box>
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <FooterPc />
    </Box>
  );
};

export default CartPc;

import React, { useState } from "react";
import { Box, Grid, Divider, Button, Radio } from "@material-ui/core";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import LazyLoad from "react-lazyload";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Currency from "../general-components/Currency";
import cryptoRandomString from "crypto-random-string";
import { PaystackButton } from "react-paystack";

const RightGrid = (props) => {
  const [reference, setReference] = useState(
    `order-${cryptoRandomString({ length: 11 })}`
  );

  const submit = () => {
    props
      .postOrder(
        {
          paymentMethod:
            props.paymentOption === "Pay Now" ? "Pay Now" : "Pay On Delivery",
          isPaidFor: props.paymentOption === "Pay Now" ? true : false,
          isNegotiated: props.cart.product.isNegotiable ? true : false,
          reference,
        },
        props.currentUser.user.id,
        props.cart.product._id,
        props.cart._id
      )
      .then(() => {
        setTimeout(() => {
          props.closeBackdrop();
          props.handleOpen2();
          setTimeout(() => {
            props.history.push("/");
          }, 3500);
        }, 0);
      })
      .catch(() => {
        props.closeBackdrop();
      });
  };

  const metadata = {
    name: `${props.user.firstName} ${props.user.lastName}`,
    phone: props.user.phone,
    product: props.cart.product.title,
  };

  const componentProps = {
    email: props.user.email,
    amount: props.cart.totalPrice * 100,
    name: `${props.user.firstName} ${props.user.lastName}`,
    phone: props.user.phone,
    reference,
    metadata,
    publicKey: "pk_live_3cac8ccda740cc70aa41003b5089453f3c61acb1",
    text: "Continue To Payment",
    onSuccess: () => submit(),
    onClose: () => setReference(`order-${cryptoRandomString({ length: 11 })}`),
  };

  const order = () => {
    props.openBackdrop();
    submit();
  };
  return (
    <Grid xs={12} md={4} lg={5} item>
      <Box className="productBackground" boxShadow={3}>
        <Box py={2} mx={1.5}>
          <Box fontSize={19} mb={1} fontWeight={600}>
            Order Summary
          </Box>
          <Divider />
          <Box my={1.5}>
            <Box fontSize={14}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Box height={150} display={{ xs: "none", md: "block" }}>
                    <LazyLoad height={150} once>
                      <img
                        alt="product's image"
                        title="product's image"
                        width="100%"
                        height="90%"
                        className="image"
                        src={props.cart.product.images[0]}
                      />
                    </LazyLoad>
                  </Box>
                  <Box height={180} display={{ xs: "block", md: "none" }}>
                    <LazyLoad height={180} once>
                      <img
                        alt="product's image"
                        title="product's image"
                        width="100%"
                        height="90%"
                        className="image"
                        src={props.cart.product.images[0]}
                      />
                    </LazyLoad>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>{props.cart.product.title}</Box>

                  <Box fontSize={13} mt={1}>
                    Condition: {props.cart.product.condition}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider />
          <Box mt={2}>
            <Box mb={1} fontSize={19} fontWeight={600}>
              Payment Options
            </Box>
            <Divider />
            <Box mx={2} mt={2.5}>
              <FormControl fullWidth component="fieldset">
                <FormLabel component="legend">
                  Select a Payment Option
                </FormLabel>
                <RadioGroup
                  aria-label="payment options"
                  name="paymentOption"
                  about="select a payment option"
                  value={props.paymentOption}
                  onChange={props.handleChange}
                >
                  <Box mt={1} pl={1.5} pr={8} border={2} borderColor="#ff6600">
                    <FormControlLabel
                      value="Pay Now"
                      control={<Radio />}
                      label="Pay Now"
                      style={{ fontWeight: "bold" }}
                    />
                  </Box>
                  {!props.cart.product.user.isBusiness && (
                    <Box
                      mt={1.5}
                      pl={1.5}
                      pr={8}
                      border={2}
                      borderColor="#ff6600"
                    >
                      <FormControlLabel
                        value="Pay on Delivery"
                        control={<Radio />}
                        label="Pay on Delivery"
                      />
                    </Box>
                  )}
                </RadioGroup>
              </FormControl>
              <Box mt={4}>
                <Box>
                  <Divider />
                  <Box my={1} display="flex" justifyContent="space-between">
                    <Box color="gray">Quantity</Box>
                    <Box fontWeight={550}>x {props.cart.quantity}</Box>
                  </Box>
                  <Divider />
                </Box>
                <Box>
                  <Box my={1} display="flex" justifyContent="space-between">
                    <Box color="gray">Subtotal</Box>
                    <Box color="#B12704" fontWeight={550}>
                      <Currency price={props.cart.price} />
                    </Box>
                  </Box>
                  <Divider />
                </Box>
                <Box>
                  <Box my={1} display="flex" justifyContent="space-between">
                    <Box color="gray">Delivery Charge</Box>
                    <Box color="#B12704" fontWeight={550}>
                      <Currency price={0} />
                    </Box>
                  </Box>
                  <Divider />
                </Box>
                <Box>
                  <Box
                    fontWeight={550}
                    fontSize={20}
                    my={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>Total</Box>
                    <Box color="#B12704">
                      <Currency price={props.cart.totalPrice} />
                    </Box>
                  </Box>
                  <Divider />
                </Box>
                <Box mt={2}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Box>Have a Coupon Code?</Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box width={1}>
                        <form noValidate autoComplete="off">
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <TextField
                                placeholder="XGFHDD"
                                id="coupon-code"
                                fullWidth
                                value={props.couponCode}
                                onChange={props.handleCouponCodeChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                onClick={props.handleCouponCodeSubmit}
                                type="submit"
                                size="small"
                                fullWidth
                                variant="contained"
                                style={{
                                  backgroundColor: "#0077be",
                                  color: "white",
                                }}
                              >
                                Apply
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box mt={2}>
                  {!props.paymentOption ? (
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      disabled
                      style={{ fontWeight: "bold" }}
                    >
                      Continue to payment
                    </Button>
                  ) : props.paymentOption !== "Pay Now" ? (
                    <Button
                      onClick={order}
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      className="callToAction"
                      style={{ fontWeight: "bold" }}
                    >
                      Place Order
                    </Button>
                  ) : (
                    <PaystackButton
                      className="callToAction checkout-button"
                      {...componentProps}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default RightGrid;

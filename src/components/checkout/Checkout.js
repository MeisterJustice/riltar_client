import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import {
  fetchUser,
  updateAddressInfo,
  addUserAddress,
} from "../../store/actions/auth";
import { postOrder } from "../../store/actions/orders";
import { fetchCartItem } from "../../store/actions/cart";
import { removeError } from "../../store/actions/errors";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CheckoutHeader from "./CheckoutHeader";
import LeftGrid from "./LeftGrid";
import RightGrid from "./RightGrid";
import SelectDialogue from "./SelectDialogue";
import InputDialogue from "./InputDialogue";
import SimpleBackdrop from "../general-components/Backdrop";
import AlertDialogue from "../general-components/AlertDialogue";

const CheckoutPc = (props) => {
  const [paymentOption, setPaymentOption] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("0");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [openAddressInput, setOpenAdressInput] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
    props.history.push("/");
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  props.history.listen(() => {
    removeError();
  });

  const openBackdrop = () => {
    setBackdropOpen(true);
  };
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectedAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleAddressInputOpen = () => {
    setOpen(false);
    setOpenAdressInput(true);
  };

  const handleAddressInputClose = () => {
    setOpenAdressInput(false);
    setOpen(true);
  };

  const handleAddressClickOpen = () => {
    setOpen(true);
  };

  const handleAddressClose = () => {
    setOpen(false);
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleCouponCodeSubmit = (e) => {
    e.preventDefault();
    console.log(couponCode);
  };

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  async function fetch() {
    await props.fetchUser(props.currentUser.user.id);
    await props.fetchCartItem(
      props.currentUser.user.id,
      props.match.params.cart_id
    );
    await setDone(true);
  }

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      <CheckoutHeader />
      <Box className="bg" py={4}>
        <Container>
          <Grid container spacing={3}>
            <LeftGrid
              {...props}
              address={props.address}
              handleAddressClickOpen={handleAddressClickOpen}
            />
            {done && (
              <RightGrid
                user={props.user}
                handleOpen2={handleOpen2}
                postOrder={props.postOrder}
                cart={props.cart_item}
                {...props}
                openBackdrop={openBackdrop}
                closeBackdrop={closeBackdrop}
                paymentOption={paymentOption}
                handleChange={handleChange}
                couponCode={couponCode}
                handleCouponCodeChange={handleCouponCodeChange}
                handleCouponCodeSubmit={handleCouponCodeSubmit}
              />
            )}
          </Grid>
          {done && (
            <SelectDialogue
              {...props}
              openBackdrop={openBackdrop}
              closeBackdrop={closeBackdrop}
              address={props.address}
              updateAddressInfo={props.updateAddressInfo}
              fullScreen={fullScreen}
              open={open}
              handleAddressClose={handleAddressClose}
              selectedAddress={selectedAddress}
              handleSelectedAddressChange={handleSelectedAddressChange}
              handleAddressInputOpen={handleAddressInputOpen}
            />
          )}
          {done && (
            <InputDialogue
              {...props}
              openBackdrop={openBackdrop}
              closeBackdrop={closeBackdrop}
              addUserAddress={props.addUserAddress}
              fullScreen={fullScreen}
              openAddressInput={openAddressInput}
              handleAddressClose={handleAddressClose}
              handleAddressInputClose={handleAddressInputClose}
            />
          )}
          <AlertDialogue
            open={open2}
            handleClose={handleClose2}
            color="#45f542"
            message="ORDER SUCCESSFUL!!... An SMS Will Be Sent To You Shortly With Delivery Info"
            open2={true}
            content={true}
          />
        </Container>
        <SimpleBackdrop backdropOpen={backdropOpen} />
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    user: state.user,
    address: state.address,
    cart_item: state.cart_item,
  };
}

export default connect(mapStateToProps, {
  removeError,
  addUserAddress,
  updateAddressInfo,
  fetchUser,
  fetchCartItem,
  postOrder,
})(CheckoutPc);

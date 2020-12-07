import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import Menu from "../components/Menu";
import Header from "../components/Header";
import { connect } from "react-redux";
import {
  fetchUser,
  updateAddressInfo,
  addUserAddress,
} from "../../../../store/actions/auth";
import { removeError } from "../../../../store/actions/errors";
import Alerts from "../../../general-components/Alert";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Item from "./Item";
import BottomMenu from "../components/BottomMenu";

const AddressPc = (props) => {
  const [data, setData] = React.useState({
    state: "",
    city: "",
    address: "",
    phone: "",
    id: "",
  });
  const [display, setDisplay] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const displayForm = () => {
    setDisplay(!display);
  };

  async function submitAddAddress() {
    await openBackdrop();
    await props
      .addUserAddress(data, props.currentUser.user.id)
      .then(() => {
        closeBackdrop();
        openSnackbar();
        displayForm();
      })
      .catch((e) => {
        closeBackdrop();
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    submitAddAddress();
  };
  props.history.listen(() => {
    removeError();
  });
  useEffect(() => {
    props.fetchUser(props.currentUser.user.id);
  }, []);
  return (
    <Box>
      <Header text="Set Shipping Address" />
      <Box mb={15} pb={5} mt={5}>
        <Container>
          <Box item xs={9}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              bgcolor="white"
              boxShadow={2}
              p={2}
            >
              <Box mt={2} display={display ? "block" : "none"} mx={3} width={1}>
                <Box fontWeight={600}>Add Address</Box>
                <Box align="center" mb={1.5}>
                  {props.errors.message && (
                    <Alerts message={props.errors.message} severity="error" />
                  )}
                </Box>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                  <Box>
                    <TextField
                      id="state"
                      label="State"
                      name="state"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="city"
                      label="City"
                      name="city"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="address"
                      label="Address"
                      name="address"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      className="callToAction"
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Box>
              {props.user._id && (
                <Item
                  address={props.address}
                  openSnackbar={openSnackbar}
                  openBackdrop={openBackdrop}
                  closeBackdrop={closeBackdrop}
                  currentUser={props.currentUser}
                  updateAddressInfo={props.updateAddressInfo}
                  displayForm={displayForm}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Box>
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Updated Successfully!"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
      <BottomMenu />
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    user: state.user,
    address: state.address,
  };
}

export default connect(mapStateToProps, {
  removeError,
  addUserAddress,
  updateAddressInfo,
  fetchUser,
})(AddressPc);

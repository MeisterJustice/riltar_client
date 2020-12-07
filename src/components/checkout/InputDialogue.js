import React, { useState } from "react";
import { Box, Divider, Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const InputDialogue = (props) => {
  const [address, setAddress] = useState({
    state: "",
    city: "",
    address: "",
    phone: "",
    id: "",
  });

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  function submitAddAddress() {
    props.handleAddressInputClose();
    props.handleAddressClose();
    props.openBackdrop();
    props
      .addUserAddress(address, props.currentUser.user.id)
      .then(() => {
        props.closeBackdrop();
      })
      .catch((e) => {
        props.displaycloseBackdrop();
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    submitAddAddress();
  };
  return (
    <Dialog
      fullScreen={props.fullScreen}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      open={props.openAddressInput}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="Add New Delivery Information"
    >
      <DialogTitle id="add-delivery-information">
        <Box display="flex" justifyContent="space-between">
          <Box fontWeight={600}>Add New Delivery Information</Box>
          <Box>
            <CloseIcon
              onClick={props.handleAddressInputClose}
              fontSize="large"
              className="cursor hover"
            />
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <form noValidate autoComplete="off">
            <Box
              width={1}
              mt={2}
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
            >
              <Box>
                <TextField
                  name="state"
                  onChange={onChange}
                  value={address.state}
                  id="state"
                  label="State"
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  name="city"
                  onChange={onChange}
                  value={address.city}
                  id="city"
                  label="city"
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  name="address"
                  onChange={onChange}
                  value={address.address}
                  id="address"
                  label="address"
                  fullWidth
                />
              </Box>
              <Box mt={2}>
                <TextField
                  name="phone"
                  onChange={onChange}
                  value={address.phone}
                  id="phone"
                  type="number"
                  label="phone"
                  fullWidth
                />
              </Box>
            </Box>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submitAddAddress}
          type="submit"
          size="small"
          fullWidth
          variant="contained"
          className="callToAction"
          style={{ fontWeight: "bold" }}
        >
          Add Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputDialogue;

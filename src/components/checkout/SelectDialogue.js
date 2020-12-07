import React from "react";
import { Box, Divider, Button } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HomeIcon from "@material-ui/icons/Home";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";

const SelectDialogue = (props) => {
  const updateAddress = (id) => {
    props.handleAddressClose();
    props.openBackdrop();
    props
      .updateAddressInfo({ id }, props.currentUser.user.id, id)
      .then(() => {
        props.closeBackdrop();
        props.openSnackbar();
      })
      .catch((e) => {
        props.closeBackdrop();
      });
  };
  return (
    <Dialog
      fullScreen={props.fullScreen}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      open={props.open}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="select delivery information"
    >
      <DialogTitle id="select-delivery-information">
        <Box display="flex" justifyContent="space-between">
          <Box fontWeight={600}>select delivery information</Box>
          <Box>
            <CloseIcon
              onClick={props.handleAddressClose}
              fontSize="large"
              className="cursor hover"
            />
          </Box>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <Box>
            <Box
              onClick={props.handleAddressInputOpen}
              className="cursor"
              color="#ff6600"
              display="flex"
              justifyContent="flex-start"
            >
              <Box>
                <AddCircleOutlineIcon />
              </Box>
              <Box ml={1} fontWeight={600}>
                ADD A NEW DELIVERY INFO
              </Box>
            </Box>
            <Divider />
            <Box
              width={1}
              mt={2}
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
            >
              <Box fontSize={12}>
                <Box m={1}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel component="legend">
                      Select delivery info
                    </FormLabel>
                    <RadioGroup
                      aria-label="select delivery information"
                      name="deliveryInformation"
                      about="select a payment option"
                      value={props.selectedAddress}
                      onChange={props.handleSelectedAddressChange}
                    >
                      {props.address.map((address) => (
                        <Box key={address.id} border={1} my={1.5}>
                          <Box ml={1.5}>
                            <FormControlLabel
                              value={address.id}
                              control={<Radio />}
                            />
                            <Box display="inline">
                              <Box display="flex" justifyContent="space-start">
                                <Box>
                                  <PersonOutlineIcon fontSize="small" />
                                </Box>
                                <Box ml={2}>
                                  {props.currentUser.user.firstName}{" "}
                                  {props.currentUser.user.lastName}
                                </Box>
                              </Box>
                              <Box
                                mt={1}
                                display="flex"
                                justifyContent="space-start"
                              >
                                <Box>
                                  <HomeIcon fontSize="small" />
                                </Box>
                                <Box ml={2}>
                                  {address.address}, {address.city},{" "}
                                  {address.state}, {address.country}
                                </Box>
                              </Box>
                              <Box
                                mt={1}
                                display="flex"
                                justifyContent="space-start"
                              >
                                <Box>
                                  <PhoneAndroidIcon fontSize="small" />
                                </Box>
                                <Box ml={2}>{address.phone}</Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => updateAddress(props.selectedAddress)}
          type="submit"
          size="small"
          fullWidth
          variant="contained"
          className="callToAction"
          style={{ fontWeight: "bold" }}
        >
          Select this address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectDialogue;

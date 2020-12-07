import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Box, Grid, TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="&#8358; "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Offer = (props) => {
  const [price, setPrice] = useState("");
  const setChange = (e) => {
    setPrice(e.target.value);
  };

  const recepient = props.currentUser.user.id === props.room.seller._id ? props.room.customer._id : props.room.seller._id

  const onMessageSubmit = (e) => {
    e.preventDefault();
    props.replyMessage({offer: price}, props.currentUser.user.id, props.room._id, recepient).then(() => {
      props.handleSend()
    })
    props.handleClose()
    setPrice("");
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ fontWeight: 600 }} id="alert-dialog-slide-title">
          Make a New Offer
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img
                  height="150"
                  width="150"
                  src={props.room.product.images[0]}
                />
              </Grid>
              <Grid item xs={6}>
                <Box color="#131921" fontSize={14}>
                  {props.room.product.title}
                </Box>
                <label for="price" className="label">
                  Price
                </label>
                <TextField
                  id="price"
                  style={{
                    border: "1px solid black",
                    borderBottom: "none",
                  }}
                  fullWidth
                  value={price}
                  onChange={setChange}
                  name="price"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    style: {
                      fontSize: 20,
                      fontWeight: "550",
                      color: "rgb(77, 76, 76)",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            CLOSE
          </Button>
          <Button style={{color: 'green'}} onClick={onMessageSubmit}>
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Offer;

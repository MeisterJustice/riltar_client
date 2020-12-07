import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {
  putProduct,
  removeAProduct,
  toggleProduct,
} from "../../../../store/actions/products";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const Select = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [form, setForm] = React.useState({
    quantity: props.product.quantity,
    price: props.product.price,
  });
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleForm = (e) => {
    if (e.target.value < 0) {
      return;
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen(false);
    setOpen1(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function updateProduct() {
    await handleClose();
    await handleClose1();
    await props.openBackdrop();
    await props.putProduct(form, props.user_id, props.product._id).then(() => {
      props.closeBackdrop();
      props.openSnackbar();
    });
  }

  async function toggleProduct() {
    await handleClose();
    await handleClose1();
    await props.openBackdrop();
    await props
      .toggleProduct({}, props.user_id, props.product._id)
      .then(() => {
        props.closeBackdrop();
        props.openSnackbar();
      })
      .catch((e) => {
        props.closeBackdrop();
        setTimeout(() => {
          props.removeError();
        }, 4000);
      });
  }

  const submitForm = (e) => {
    e.preventDefault();
    updateProduct();
  };

  const handleToggle = (e) => {
    e.preventDefault();
    toggleProduct();
  };

  async function deleteProduct() {
    await handleClose();
    await handleClose1();
    await props.openBackdrop();
    await props.removeAProduct(props.user_id, props.product._id);
    await props.closeBackdrop();
    await props.openSnackbar1();
  }

  const submitForm1 = (e) => {
    e.preventDefault();
    deleteProduct();
  };

  const previewLink = `/${props.product.title
    .split(" ")
    .join("-")
    .split("/")
    .join("-")}/${props.product._id}`;

  return (
    <div>
      <MoreVertIcon
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="link2"
          to={previewLink}
        >
          <MenuItem
            style={{ fontSize: 11, fontWeight: "550" }}
            onClick={handleClose}
          >
            PREVIEW
          </MenuItem>
        </Link>
        <MenuItem
          style={{ fontSize: 11, fontWeight: "550" }}
          // onClick={handleClose}
          onClick={handleClickOpen}
        >
          EDIT
        </MenuItem>
        <MenuItem
          style={{ fontSize: 11, fontWeight: "550" }}
          onClick={handleToggle}
        >
          {props.product.isPaused ? "ACTIVATE" : "PAUSE"}
        </MenuItem>
        <MenuItem
          style={{ fontSize: 11, fontWeight: "550" }}
          onClick={handleClickOpen1}
        >
          DELETE
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update your product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="quantity"
            value={form.quantity}
            onChange={handleForm}
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
          />
          <TextField
            name="price"
            value={form.price}
            onChange={handleForm}
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose1}
            style={{ backgroundColor: "#0077be", color: "white" }}
          >
            CLOSE
          </Button>
          <Button onClick={submitForm} className="callToAction">
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ color: "red" }} id="form-delete-title">
          <Box textAlign="center">
            This action deletes this product permanently! Wanna continue?
          </Box>
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={handleClose1}
            style={{ backgroundColor: "#0077be", color: "white" }}
          >
            CLOSE
          </Button>
          <Button onClick={submitForm1} className="callToAction">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}
export default connect(mapStateToProps, {
  putProduct,
  removeAProduct,
  toggleProduct,
})(Select);

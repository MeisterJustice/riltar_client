import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { fetchCart } from "../../../store/actions/cart";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import NavbarItem from "./NavbarItems";
import NavbarItem2 from "./NavbarItems2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavbarPc = (props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    props.fetchCart(props.currentUser.user.id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const clickProduct = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let link = text
      .toLowerCase()
      .split(" ")
      .join("-")
      .split("/")
      .join("$")
      .split(".")
      .join("&");
    props.history.push(`/${link}`);
    clickProduct();
  };

  return (
    <Box
      style={{ position: "fixed", zIndex: "999" }}
      boxShadow={3}
      width="100%"
      height={72}
      bgcolor="#232F3E"
    >
      <Box mx={10}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="space-around"
        >
          <Box mb={0.7} flexGrow={1}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Link className="textColor" to="/">
                <Box color="white" mt={2} fontSize={24} fontWeight="bold">
                  Riltar
                </Box>
              </Link>
              <Box
                onClick={handleClickOpen}
                className="search"
                style={{ borderWidth: "2px" }}
                borderRadius={50}
                ml={5}
                flexGrow={1}
                height={33}
                mt={2}
                border={1}
                borderColor="white"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box overflow="hidden" fontSize={17} color="gray" flexGrow={1}>
                  <Box ml={2} pt={0.6}>
                    Search for a product
                  </Box>
                </Box>
                <Box
                  flexShrink={2}
                  justifySelf="flex-end"
                  borderRadius={50}
                  textAlign="center"
                  color="white"
                  fontSize={18}
                  fontWeight="fontWeightBold"
                  pr={5}
                  bgcolor="white"
                >
                  <Box height="100%" display="inline">
                    <Box color="#131921" ml={5} mt={0.6}>
                      Search
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                fontSize="14px"
                className="cursor link"
                textAlign="center"
                ml={7}
                mr={2}
                mt={2.2}
              >
                <Link className="link" to="/profile">
                  {props.currentUser && props.currentUser.isAuthenticated && (
                    <Box>
                      <Box ml={1}>
                        <Avatar
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                          alt={`${props.currentUser.user.firstName}`}
                          src="https://www.uokpl.rs/fpng/d/43-437283_empty-profile-picture.png"
                        />
                      </Box>
                    </Box>
                  )}
                  {props.currentUser && !props.currentUser.isAuthenticated && (
                    <Box>
                      <Box ml={1}>
                        <Avatar
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                          alt="Riltar"
                          src="https://www.uokpl.rs/fpng/d/43-437283_empty-profile-picture.png"
                        />
                      </Box>
                    </Box>
                  )}
                </Link>
              </Box>
              <NavbarItem {...props} />
              <NavbarItem2
                cart={props.cartItem ? props.cartItem : props.cart}
                {...props}
              />
              <Box
                fontSize="14px"
                className="cursor"
                textAlign="center"
                mt={2.4}
              >
                <Link className="link" to="/sell">
                  <AddCircleOutlineOutlinedIcon style={{ color: "white" }} />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar style={{ background: "#232F3E" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Toolbar>
            <Box width={1}>
              <Container>
                <form onSubmit={handleSubmit}>
                  <TextField
                    style={{ border: "2px solid white" }}
                    autoFocus
                    margin="dense"
                    name="text"
                    id="search"
                    type="search"
                    color="white"
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon
                            style={{ color: "white", marginLeft: "20px" }}
                            fontSize="large"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Container>
            </Box>
          </AppBar>
        </Dialog>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps, {
  fetchCart,
})(NavbarPc);

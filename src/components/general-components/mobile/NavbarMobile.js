import React, { Component, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import { fetchCart } from "../../../store/actions/cart";
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
import Badge from "@material-ui/core/Badge";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { connect } from "react-redux";
import Draw from "./Draw";
import { fetchCategories } from "../../../store/actions/categories";
import NavbarItem2 from "./NavbarItem2";
import NavbarItem from "./NavbarItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavbarMobile = (props) => {
  const [state, setState] = useState({
    text: "",
    open: false,
    isDrawerOpen: false,
  });
  const [done, setDone] = useState(false);

  async function fetch() {
    await props.fetchCategories();
    setDone(true);
    props.fetchCart(props.currentUser.user.id);
  }

  useEffect(() => {
    fetch();
  }, []);

  const handleClickOpen = (e) => {
    setState({ ...state, open: true });
  };

  const handleClose = (e) => {
    setState({ ...state, open: false });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrawerOpen = () => {
    setState({ ...state, isDrawerOpen: true });
  };

  const handleDrawerClose = () => {
    setState({ ...state, isDrawerOpen: false });
  };
  const clickProduct = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let link = state.text
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
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ position: "fixed", zIndex: "999" }}
      boxShadow={1}
      width={1}
      height={90}
      bgcolor="#232F3E"
    >
      <Container>
        <Box
          mt={0.5}
          width={1}
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
        >
          <Box alignSelf="center" onClick={handleDrawerOpen}>
            <Box width="20px" style={{ borderTop: "2px solid white" }}></Box>
            <Box
              mt={0.7}
              width="20px"
              style={{ borderTop: "2px solid white" }}
            ></Box>
            <Box
              mt={0.7}
              width="20px"
              style={{ borderTop: "2px solid white" }}
            ></Box>
          </Box>
          <Box
            width={1}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box alignSelf="center" color="white" flexGrow={1} ml={2}>
              Riltar
            </Box>
            <Box alignSelf="center" mr={1.5} className="cursor">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/signin"
              >
                Sign In
              </Link>
            </Box>
            <NavbarItem {...props} />
            <NavbarItem2
              cart={props.cartItem ? props.cartItem : props.cart}
              {...props}
            />
          </Box>
        </Box>
        <Box onClick={handleClickOpen} mt={2} height={30} width={1}>
          <Box
            color="gray"
            style={{ border: "1.5px solid white" }}
            height={30}
            width={1}
            borderRadius="20px"
          >
            <Box ml={2} mt={0.8}>
              Search for products
            </Box>
          </Box>
        </Box>
        <Dialog
          fullScreen
          open={state.open}
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
                    id="search-mobile"
                    type="search"
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
      </Container>
      <Draw
        categories={props.categories}
        isDrawerOpen={state.isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        currentUser={props.currentUser}
        logout={props.logout}
      />
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    cart: state.cart,
  };
}
export default connect(mapStateToProps, {
  fetchCategories,
  fetchCart,
})(NavbarMobile);

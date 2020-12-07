import React, { useEffect } from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import { connect } from "react-redux";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import BottomMenu from "../components/BottomMenu";
import Item from "./Item";
import { fetchUserProducts } from "../../../../store/actions/products";
import { removeError } from "../../../../store/actions/errors";
import Alerts from "../../../general-components/Alert";
import { Link } from "react-router-dom";

const MyStoreMobile = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchUserProducts(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  props.history.listen(() => {
    removeError();
  });
  return (
    <Box>
      <Header text="Your Store" />
      <Box pt={3} pb={15}>
        <Container>
          <Box align="right" mb={2}>
            <Link to="/sell">
              <AddCircleOutlineOutlinedIcon
                className="cursor"
                style={{ color: "#ff6600", fontSize: 47 }}
              />
            </Link>
          </Box>
          <Box mb={1}>
            {props.errors.message && (
              <Alerts message={props.errors.message} severity="error"></Alerts>
            )}
          </Box>
          <Box>
            {done && (
              <Item
                removeError={props.removeError}
                products={props.products}
                user_id={props.currentUser.user.id}
              />
            )}
            {!done && (
              <Box
                height="90vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress color="gray" />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      <BottomMenu />
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    products: state.products,
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  fetchUserProducts,
  removeError,
})(MyStoreMobile);

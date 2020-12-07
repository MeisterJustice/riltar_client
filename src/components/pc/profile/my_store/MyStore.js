import React, { useEffect } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Header from "../components/Header";
import { connect } from "react-redux";
import Menu from "../components/Menu";
import Item from "./Item";
import Alerts from "../../../general-components/Alert";
import { fetchUserProducts } from "../../../../store/actions/products";
import { Link } from "react-router-dom";
import { removeError } from "../../../../store/actions/errors";

const MyStorePc = (props) => {
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
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <Box pb={5} mt={2}>
        <Container>
          <Header />
          <Grid spacing={5} container>
            <Grid item xs={3}>
              <Menu {...props} />
            </Grid>
            <Grid item xs={9}>
              <Box width={1}>
                <Box fontSize={23} fontWeight={600} mb={2}>
                  Your Store
                </Box>
                <Box fontSize={13} p={4} bgcolor="white">
                  <Box align="right" mb={5}>
                    <Link to="/sell">
                      <AddCircleOutlineOutlinedIcon
                        className="cursor"
                        style={{ color: "#ff6600", fontSize: 47 }}
                      />
                    </Link>
                  </Box>
                  <Box mb={1}>
                    {props.errors.message && (
                      <Alerts
                        message={props.errors.message}
                        severity="error"
                      ></Alerts>
                    )}
                  </Box>
                  {done && (
                    <Item
                      {...props}
                      products={props.products}
                      user_id={props.currentUser.user.id}
                      removeError={props.removeError}
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
})(MyStorePc);

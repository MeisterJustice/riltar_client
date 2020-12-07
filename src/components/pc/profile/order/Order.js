import React, { useEffect } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import Menu from "../components/Menu";
import OrderItem from "./Item";
import Header from "../components/Header";
import { connect } from "react-redux";
import { fetchOrders } from "../../../../store/actions/orders";

const OrderPc = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchOrders(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
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
              <Box fontSize={23} fontWeight={600} mb={2}>
                Your Orders
              </Box>

              <Box>
                {done && <OrderItem orders={props.orders} />}
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchOrders,
})(OrderPc);

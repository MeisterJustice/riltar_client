import React, { useEffect } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import OrderItem from "./Item";
import BottomMenu from "../components/BottomMenu";
import { connect } from "react-redux";
import { fetchOrders } from "../../../../store/actions/orders";

const OrderMobile = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchOrders(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      <Header text="Your Orders" />
      <Box mb={15} mt={5}>
        <Container>
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
        </Container>
      </Box>
      <BottomMenu />
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
})(OrderMobile);

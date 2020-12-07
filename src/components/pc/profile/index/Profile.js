import React, { lazy, Suspense, useEffect, useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Header from "../components/Header";
import { connect } from "react-redux";
import { fetchSells, fetchOrders } from "../../../../store/actions/orders";
import { fetchLastRooms } from "../../../../store/actions/message";
import { fetchAllViewsForAUserProduct } from "../../../../store/actions/views";
const Menu = lazy(() => import("../components/Menu"));
const RightGrid = lazy(() => import("./RightGrid"));
const SalesAnalytics = lazy(() => import("./SalesAnalytics"));
const SalesChart = lazy(() => import("./ViewsChart"));
const ShoppingAnalytics = lazy(() => import("./ShoppingAnalytics"));

const ProfilePc = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchSells(props.currentUser.user.id);
    await props.fetchOrders(props.currentUser.user.id);
    await props.fetchLastRooms(props.currentUser.user.id);
    await props.fetchAllViewsForAUserProduct(props.currentUser.user.id);
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
            <Grid item xs={12} md={3}>
              <Suspense fallback={<div></div>}>
                <Menu {...props} />
              </Suspense>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box width={1}>
                <Box fontSize={23} fontWeight={600} mb={2}>
                  Overview
                </Box>
                <Box mt={1}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} lg={8}>
                      {done && (
                        <Box>
                          <Suspense fallback={<div></div>}>
                            <SalesAnalytics orders={props.sells} />
                          </Suspense>
                          <Suspense fallback={<div></div>}>
                            <ShoppingAnalytics orders={props.orders} />
                          </Suspense>
                          <Suspense fallback={<div></div>}>
                            <SalesChart views={props.views} />
                          </Suspense>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      {done && (
                        <Suspense fallback={<div></div>}>
                          <RightGrid
                            {...props}
                            orders={props.sells}
                            rooms={props.rooms}
                          />
                        </Suspense>
                      )}
                    </Grid>
                  </Grid>
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
    orders: state.orders,
    sells: state.sells,
    rooms: state.rooms,
    currentUser: state.currentUser,
    views: state.views,
  };
}

export default connect(mapStateToProps, {
  fetchSells,
  fetchOrders,
  fetchLastRooms,
  fetchAllViewsForAUserProduct,
})(ProfilePc);

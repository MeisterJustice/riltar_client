import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Container,
  Badge,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
import { fetchSells, fetchOrders } from "../../../../store/actions/orders";
import { fetchLastRooms } from "../../../../store/actions/message";
import { fetchAllViewsForAUserProduct } from "../../../../store/actions/views";
import { fetchUser } from "../../../../store/actions/auth";
import Header from "./Header";
import { Link } from "react-router-dom";
import BottomMenu from "../components/BottomMenu";
import Skeleton from "@material-ui/lab/Skeleton";
const MenuMobile = lazy(() => import("../components/Menu"));
const ShoppingAnalytics = lazy(() => import("./ShoppingAnalytics"));
const SalesAnalytics = lazy(() => import("./SalesAnalytics"));
const ViewsChart = lazy(() => import("./ViewsChart"));
const Notification = lazy(() => import("./Notification"));

const ProfileMobile = (props) => {
  const [done, setDone] = useState(false);
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);
  const [done4, setDone4] = useState(false);
  async function fetch() {
    await await props.fetchUser(props.currentUser.user.id);
    await setDone1(true);
    await props.fetchLastRooms(props.currentUser.user.id);
    setDone2(true);
    await props.fetchSells(props.currentUser.user.id);
    setDone3(true);
    await props.fetchOrders(props.currentUser.user.id);
    await setDone4(true);
    await props.fetchAllViewsForAUserProduct(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box bgcolor="white" height={!done ? "100vh" : null}>
      <Box pb={15}>
        <Container>
          {done1 && <Header user={props.user} />}
          <Box mt={2} bgcolor="white" borderRadius={10}>
            <Suspense
              fallback={
                <Box mt={2}>
                  <Skeleton variant="rect" height={85} />
                </Box>
              }
            >
              <MenuMobile />
            </Suspense>
          </Box>
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box fontSize={20}>
              <Badge badgeContent={6} color="secondary">
                <Link
                  to="/message"
                  className="link"
                  style={{ textDecoration: "underline" }}
                >
                  Messages
                </Link>
              </Badge>
            </Box>
            <Box>
              {done2 && (
                <Suspense
                  fallback={
                    <Box display="flex" justifyContent="space-start">
                      <Skeleton variant="circle" width={35} height={35} />
                      <Skeleton variant="circle" width={35} height={35} />
                      <Skeleton variant="circle" width={35} height={35} />
                      <Skeleton variant="circle" width={35} height={35} />
                      <Skeleton variant="circle" width={35} height={35} />
                    </Box>
                  }
                >
                  <Notification rooms={props.rooms} />
                </Suspense>
              )}
            </Box>
          </Box>
          <Box mt={3}>
            {done3 && (
              <Suspense
                fallback={
                  <Box mt={2}>
                    <Skeleton variant="rect" height={150} />
                  </Box>
                }
              >
                <SalesAnalytics orders={props.sells} />
              </Suspense>
            )}
          </Box>
          <Box mt={3}>
            {done4 && (
              <Suspense
                fallback={
                  <Box mt={2}>
                    <Skeleton variant="rect" height={150} />
                  </Box>
                }
              >
                <ShoppingAnalytics orders={props.orders} />
              </Suspense>
            )}
          </Box>
          <Box mt={3}>
            {done && (
              <Suspense
                fallback={
                  <Box mt={2}>
                    <Skeleton variant="rect" height={125} />
                  </Box>
                }
              >
                <ViewsChart views={props.views} />
              </Suspense>
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
    sells: state.sells,
    rooms: state.rooms,
    currentUser: state.currentUser,
    views: state.views,
    user: state.user,
  };
}
export default connect(mapStateToProps, {
  fetchSells,
  fetchOrders,
  fetchUser,
  fetchLastRooms,
  fetchAllViewsForAUserProduct,
})(ProfileMobile);

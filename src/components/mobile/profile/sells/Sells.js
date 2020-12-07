import React, { lazy, Suspense, useEffect } from "react";
import Header from "../components/Header";
import { Box, Container } from "@material-ui/core";
import { removeError } from "../../../../store/actions/errors";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { fetchSells, confirmOrder } from "../../../../store/actions/orders";
import BottomMenu from "../components/BottomMenu";
import SellsItem from "./Item";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SellsMobile = (props) => {
  const [value, setValue] = React.useState(0);
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchSells(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  props.history.listen(() => {
    removeError();
  });
  return (
    <Box>
      <Header text="Your Sales" />
      <Box pt={5} pb={30}>
        <Container>
          <Box>
            <AppBar style={{ backgroundColor: "#092b4a" }} position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="sales menu"
                centered
              >
                <Tab style={{ fontSize: 12 }} label="Open" {...a11yProps(0)} />
                <Tab
                  style={{ fontSize: 12 }}
                  label="Delivered"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ fontSize: 12 }}
                  label="Cancelled"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            {done && (
              <SellsItem
                {...props}
                confirmOrder={props.confirmOrder}
                orders={props.sells}
                value={value}
                errors={props.errors}
              />
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
    sells: state.sells,
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  fetchSells,
  confirmOrder,
  removeError,
})(SellsMobile);

import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import EachItem from "./EachItem";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";

const SellsTable = (props) => {
  const [orders, setOrders] = useState([]);
  const [done, setDone] = useState(false);
  const [hideId, setHideId] = useState("");
  const [hideId1, setHideId1] = useState("");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const openBackdrop = () => {
    setBackdropOpen(true);
  };
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };
  const openSnackbar = () => {
    setSnackbarOpen(true);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  const setHide = (id) => {
    setHideId(id);
  };
  const setHide1 = (id) => {
    setHideId1(id);
  };

  async function fetchData() {
    let openOrders = [];
    if (props.open) {
      for (var i = 0; i < props.orders.length; i++) {
        if (props.orders[i].isDelivered === false) {
          openOrders.push(props.orders[i]);
        }
      }
    } else if (props.delivered) {
      for (var i = 0; i < props.orders.length; i++) {
        if (props.orders[i].isDelivered === true) {
          openOrders.push(props.orders[i]);
        }
      }
    } else if (props.cancelled) {
      for (var i = 0; i < props.orders.length; i++) {
        if (props.orders[i].isCancelled === true) {
          openOrders.push(props.orders[i]);
        }
      }
    }
    await setOrders(openOrders);
    await setDone(true);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      {done && (
        <Box>
          {orders.map((order, index) => (
            <Box
              display={hideId === order._id ? "none" : "block"}
              key={order._id}
            >
              <EachItem
                openBackdrop={openBackdrop}
                closeBackdrop={closeBackdrop}
                openSnackbar={openSnackbar}
                setHide={setHide}
                setHide1={setHide1}
                hideId1={hideId1}
                {...props}
                errors={props.errors}
                confirmOrder={props.confirmOrder}
                status={
                  props.open
                    ? "open"
                    : props.delivered
                    ? "delivered"
                    : "cancelled"
                }
                order={order}
              />
            </Box>
          ))}
        </Box>
      )}
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Successfull!!.. Funds has been sent to your Bank account and changes will reflect shortly"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
    </Box>
  );
};

export default SellsTable;

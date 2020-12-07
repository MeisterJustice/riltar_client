import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import Select from "./Select";
import Currency from "../../../general-components/Currency";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Empty from "../components/Empty";

const Item = (props) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpen1, setSnackbarOpen1] = useState(false);
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
  const openSnackbar1 = () => {
    setSnackbarOpen1(true);
  };
  const closeSnackbar1 = () => {
    setSnackbarOpen1(false);
  };
  return (
    <Box fontSize={11}>
      {props.products.length < 1 ? (
        <Empty text="You don't have any listed product" />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box mb={2} fontWeight={600}>
              Product
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                <Box
                  fontWeight={600}
                  fontSize={10}
                  display="inline"
                  style={{
                    color: product.live.isLive
                      ? "green"
                      : !product.live.isLive
                      ? "orange"
                      : "yellow",
                  }}
                >
                  {product.live.isLive
                    ? "live"
                    : !product.live.isLive
                    ? "under review"
                    : "paused"}
                </Box>
                <Box display="inline" ml={2}>
                  {product.title.substring(0, 35)}...
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Box mb={2} fontWeight={600}>
              Price
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                <Currency price={product.price} />
              </Box>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Box mb={2} fontWeight={600}>
              Views
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                {product.totalViews}
              </Box>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Box mb={2} fontWeight={600}>
              Rating
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                {product.averageRating}
              </Box>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Box mb={2} fontWeight={600}>
              Quantity
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                {product.quantity}
              </Box>
            ))}
          </Grid>
          <Grid item xs={1}>
            <Box mb={2} fontWeight={600}>
              Orders
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                {product.totalOrders}
              </Box>
            ))}
          </Grid>
          <Grid item xs={2}>
            <Box mb={2} fontWeight={600}>
              More
            </Box>
            {props.products.map((product, index) => (
              <Box key={index} mt={5}>
                <Select
                  openBackdrop={openBackdrop}
                  closeBackdrop={closeBackdrop}
                  product={product}
                  user_id={props.user_id}
                  openSnackbar={openSnackbar}
                  openSnackbar1={openSnackbar1}
                  removeError={props.removeError}
                  {...props}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      )}
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Updated Successfully!"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
      <Snackbars
        message="Product Deleted Successfully!"
        open={snackbarOpen1}
        handleClose={closeSnackbar1}
        position="right"
      />
    </Box>
  );
};

export default Item;

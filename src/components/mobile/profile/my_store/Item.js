import React, { useState } from "react";
import { Box, Divider } from "@material-ui/core";
import Select from "./Select";

import Currency from "../../../general-components/Currency";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Empty from "../../../pc/profile/components/Empty";

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
    <Box>
      {props.products.length < 1 ? (
        <Empty text="You don't have any listed product" />
      ) : (
        props.products.map((product, index) => (
          <Box
            bgcolor="white"
            mt={4}
            fontSize={12.5}
            boxShadow={2}
            p={2}
            borderRadius={10}
          >
            <Box mb={1} display="flex" justifyContent="space-between">
              <Box
                fontSize={13.5}
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
              <Box ml={1} flexGrow={1}>
                {product.title.substring(0, 62)}...
              </Box>
              <Box ml={1}>
                <Select
                  removeError={props.removeError}
                  openBackdrop={openBackdrop}
                  closeBackdrop={closeBackdrop}
                  product={product}
                  user_id={props.user_id}
                  openSnackbar={openSnackbar}
                  openSnackbar1={openSnackbar1}
                />
              </Box>
            </Box>
            <Divider />
            <Box mx={0.5} display="flex" justifyContent="space-between">
              <Box>
                <Box fontWeight={600} mt={1.5}>
                  Price
                </Box>
                <Box mt={1} textAlign="center">
                  <Currency price={product.price} />
                </Box>
              </Box>
              <Box>
                <Box fontWeight={600} mt={1.5}>
                  Views
                </Box>
                <Box mt={1} textAlign="center">
                  {product.totalViews}
                </Box>
              </Box>
              <Box>
                <Box fontWeight={600} mt={1.5}>
                  Rating
                </Box>
                <Box mt={1} textAlign="center">
                  {product.averageRating}
                </Box>
              </Box>
              <Box>
                <Box fontWeight={600} mt={1.5}>
                  Quantity
                </Box>
                <Box mt={1} textAlign="center">
                  {product.quantity}
                </Box>
              </Box>
              <Box>
                <Box fontWeight={600} mt={1.5}>
                  Orders
                </Box>
                <Box mt={1} textAlign="center">
                  {product.totalOrders}
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      )}
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Updated Successfully!"
        open={snackbarOpen}
        handleClose={closeSnackbar}
      />
      <Snackbars
        message="Product Deleted Successfully!"
        open={snackbarOpen1}
        handleClose={closeSnackbar1}
      />
    </Box>
  );
};

export default Item;

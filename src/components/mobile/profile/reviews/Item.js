import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import Image from "./Image";
import Form from "./Form";
import Empty from "../../../pc/profile/components/Empty";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Alerts from "../../../general-components/Alert";

const ReviewItem = (props) => {
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
  return (
    <Box>
      {props.orders.length > 1 ? (
        <Empty text="There's Nothing Here" />
      ) : (
        props.orders.map((order, index) => (
          <Box mt={2} key={order._id}>
            <Box mb={1}>
              {props.errors.message && (
                <Alerts
                  message={props.errors.message}
                  severity="error"
                ></Alerts>
              )}
            </Box>
            <Box boxShadow={2} bgcolor="white">
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Image image={order.product.images[0]} />
                </Grid>
                <Grid item xs={8}>
                  <Form
                    errors={props.errors}
                    openBackdrop={openBackdrop}
                    closeBackdrop={closeBackdrop}
                    postForm={props.postForm}
                    openSnackbar={openSnackbar}
                    currentUser={props.currentUser}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Box>
          </Box>
        ))
      )}
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Thank you! Your review helps other buyers make better decisions"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        snackbarOpen={snackbarOpen}
      />
    </Box>
  );
};

export default ReviewItem;

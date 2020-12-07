import React, { useEffect, useState } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import { fetchUser, updateUserDetails } from "../../../../store/actions/auth";
import { removeError } from "../../../../store/actions/errors";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Form from "./Form";

const PersonalPc = (props) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [done, setDone] = useState(false);
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

  props.history.listen(() => {
    removeError();
  });
  async function fetch() {
    await props.fetchUser(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <Box pb={5} mt={2}>
        <Container>
          <Grid spacing={5} container>
            <Grid item xs={3}>
              <Menu {...props} />
            </Grid>
            <Grid item xs={9}>
              <Box fontSize={23} fontWeight={600} mb={2}>
                Personal Details
              </Box>
              {done && (
                <Form
                  user={props.user}
                  {...props}
                  openBackdrop={openBackdrop}
                  updateUserDetails={props.updateUserDetails}
                  closeBackdrop={closeBackdrop}
                  openSnackbar={openSnackbar}
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
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Updated Successfully! Image may take a while to reflect"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    user: state.user,
  };
}

export default connect(mapStateToProps, {
  removeError,
  updateUserDetails,
  fetchUser,
})(PersonalPc);

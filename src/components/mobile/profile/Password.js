import React, { useEffect, useState } from "react";
import { Box, Container, TextField, Button, Divider } from "@material-ui/core";
import Header from "./components/Header";
import BottomMenu from "./components/BottomMenu";
import { connect } from "react-redux";
import { removeError } from "../../../store/actions/errors";
import Alerts from "../../general-components/Alert";
import { changePassword } from "../../../store/actions/auth";
import SimpleBackdrop from "../../general-components/Backdrop";
import Snackbars from "../../general-components/Snackbar";

const PasswordMobile = (props) => {
  const [data, setData] = React.useState({
    pin: "",
    oldPin: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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

  async function submit() {
    await openBackdrop();
    await props
      .changePassword(data, props.currentUser.user.id)
      .then(() => {
        closeBackdrop();
        openSnackbar();
      })
      .catch((e) => {
        closeBackdrop();
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  props.history.listen(() => {
    removeError();
  });
  return (
    <Box>
      <Header text="Change Password & Pin" />
      <Box mb={15} mt={5}>
        <Container>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="white"
              boxShadow={2}
              p={2}
            >
              <Box mx={3} width={1}>
                <Box align="center" mb={1.5}>
                  {props.errors.message && (
                    <Alerts message={props.errors.message} severity="error" />
                  )}
                </Box>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                  <Box>
                    <TextField
                      id="oldPin"
                      label="Current Pin"
                      name="oldPin"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="pin"
                      label="New Pin"
                      name="pin"
                      type="number"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={5} mb={3}>
                    <Divider />
                  </Box>
                  <Box>
                    <TextField
                      id="newPassword"
                      label="New Password"
                      type="password"
                      name="newPassword"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="confirmNewPassword"
                      label="Confirm New Password"
                      type="password"
                      name="confirmNewPassword"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={5} mb={3}>
                    <Divider />
                  </Box>
                  <Box>
                    <TextField
                      required
                      id="password"
                      label="Current Password"
                      type="password"
                      name="password"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      size="large"
                      fullWidth
                      variant="contained"
                      className="callToAction"
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <SimpleBackdrop backdropOpen={backdropOpen} />
      <Snackbars
        message="Updated Successfully!"
        open={snackbarOpen}
        handleClose={closeSnackbar}
        position="right"
      />
      <BottomMenu />
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { removeError, changePassword })(
  PasswordMobile
);

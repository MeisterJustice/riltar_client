import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField, Button } from "@material-ui/core";
import Header from "./components/Header";
import BottomMenu from "./components/BottomMenu";
import { connect } from "react-redux";
import { postSupport } from "../../../store/actions/support";
import { removeError } from "../../../store/actions/errors";
import Alerts from "../../general-components/Alert";
import SimpleBackdrop from "../../general-components/Backdrop";
import Snackbars from "../../general-components/Snackbar";

const SupportPc = (props) => {
  const [data, setData] = React.useState({
    title: "",
    body: "",
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
      .postSupport(data, props.currentUser.user.id)
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
      <Header text="Support" />
      <Box pb={5} mt={2}>
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
                  <h3>Got any query or suggestion for us?</h3>
                  <Box mt={2}>
                    <TextField
                      id="title"
                      label="Title"
                      name="title"
                      fullWidth
                      onChange={onChange}
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      id="body"
                      label="Body"
                      name="body"
                      multiline
                      rowsMax={5}
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
                      Post
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
        message="Posted Successfully!....You'll be reached by email"
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

export default connect(mapStateToProps, { removeError, postSupport })(
  SupportPc
);

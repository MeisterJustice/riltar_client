import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import { connect } from "react-redux";
import { fetchUser, updateBank } from "../../../../store/actions/auth";
import { removeError } from "../../../../store/actions/errors";
import SimpleBackdrop from "../../../general-components/Backdrop";
import Snackbars from "../../../general-components/Snackbar";
import Form from "./Form";
import axios from "axios";

const BankMobile = (props) => {
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [banks, setBanks] = useState([]);

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
    await axios.get("https://api.paystack.co/bank").then((response) => {
      setBanks(response.data.data);
    });
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      <Header text="Bank Details" />
      <Box mb={15} mt={5}>
        <Container>
          <Box>
            {done && (
              <Form
                user={props.user}
                banks={banks}
                {...props}
                openBackdrop={openBackdrop}
                updateBank={props.updateBank}
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
          </Box>
          <SimpleBackdrop backdropOpen={backdropOpen} />
          <Snackbars
            message="Updated Successfully!"
            open={snackbarOpen}
            handleClose={closeSnackbar}
            position="right"
          />
        </Container>
      </Box>
      <BottomMenu />
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
  updateBank,
  fetchUser,
})(BankMobile);

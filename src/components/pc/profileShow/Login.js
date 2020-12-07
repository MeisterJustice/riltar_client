import React, { useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import Alerts from "../../general-components/Alert";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorEmail: false,
    helperTextEmail: "",
    errorPassword: false,
    helperTextPassword: "",
  });
  const [done, setDone] = useState(false);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password && state.email) {
      setDone(true);
      props
        .onAuth("signin", { email: state.email, password: state.password })
        .then(() => {
          props.handleClose();
          props.openSnackbar1();
          setDone(false);
        })
        .catch(() => {
          setDone(false);
          setState({ ...state, password: "" });
          return;
        });
    } else {
      if (!state.email || state.email.length === 0) {
        setState({ ...state, errorEmail: true, helperTextEmail: "required" });
      } else {
        setState({ ...state, errorEmail: false, helperTextEmail: "" });
      }
      if (!state.password || state.password.length === 0) {
        setState({
          ...state,
          errorPassword: true,
          helperTextPassword: "required",
        });
      } else {
        setState({ ...state, errorPassword: false, helperTextPassword: "" });
      }
    }
  };
  return (
    <Box>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to be Logged In before you can add item to cart!
          </DialogContentText>
          <Box mt={1} align="center">
            {props.errors.message && (
              <Alerts message={props.errors.message} severity="error"></Alerts>
            )}
          </Box>
          <TextField
            autoFocus
            margin="dense"
            error={state.errorEmail}
            helperText={state.helperTextEmail}
            onChange={handleChange}
            value={state.email}
            required
            name="email"
            type="email"
            id="email-signin"
            label="Email"
            fullWidth
          />
          <TextField
            error={state.errorPassword}
            helperText={state.helperTextPassword}
            onChange={handleChange}
            name="password"
            value={state.password}
            required
            type="password"
            id="password-signin"
            label="Password"
            fullWidth
          />
          <Box align="right" mt={2} color="#0077be" fontSize={13}>
            <Link
              to={{
                pathname: `/signup`,
                query: { backUrl: window.location.pathname },
              }}
            >
              not registered? sign up
            </Link>
          </Box>
          <Box align="right" mt={1} color="#0077be" fontSize={13}>
            <Link to="/signup">forgot password?</Link>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          {done ? (
            <CircularProgress />
          ) : (
            <Button onClick={handleSubmit} color="primary">
              Sign In
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;

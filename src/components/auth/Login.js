import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { isMobileOnly } from "react-device-detect";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import Alerts from "../general-components/Alert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorEmail: false,
      helperTextEmail: "",
      errorPassword: false,
      helperTextPassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit2 = (e) => {
    e.preventDefault();
    if (this.state.password && this.state.email) {
      this.props
        .onAuth("signin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(() => {
          if (this.props.location.query) {
            this.props.history.push(this.props.location.query.backUrl);
          } else {
            this.props.history.push("/");
          }
        })
        .catch(() => {
          this.setState({ password: "" });
          return;
        });
    } else {
      if (!this.state.email || this.state.email.length === 0) {
        this.setState({ errorEmail: true, helperTextEmail: "required" });
      } else {
        this.setState({ errorEmail: false, helperTextEmail: "" });
      }
      if (!this.state.password || this.state.password.length === 0) {
        this.setState({ errorPassword: true, helperTextPassword: "required" });
      } else {
        this.setState({ errorPassword: false, helperTextPassword: "" });
      }
    }
  };
  render() {
    const {
      email,
      password,
      errorPassword,
      errorEmail,
      helperTextPassword,
      helperTextEmail,
    } = this.state;
    const { errors, removeError, history } = this.props;
    history.listen(() => {
      removeError();
    });
    return (
      <div>
        <Paper elevation={2}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
            spacing={0}
          >
            <Grid style={{ marginBottom: "0" }} item>
              <h1
                style={{
                  fontSize: "40px",
                  color: "#0077be",
                  fontStyle: "italic",
                }}
              >
                riltar
              </h1>
            </Grid>
            <Grid style={{ marginTop: "0" }} item>
              <div>Welcome back</div>
            </Grid>
            <Grid item>
              {errors.message && (
                <Alerts message={errors.message} severity="error"></Alerts>
              )}
            </Grid>
            {isMobileOnly && (
              <div>
                <form
                  style={{ marginTop: "10px" }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid item>
                    <TextField
                      error={errorEmail}
                      helperText={helperTextEmail}
                      onChange={this.handleChange}
                      value={email}
                      required
                      name="email"
                      type="email"
                      id="email-mobile-signin"
                      label="Email"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorPassword}
                      helperText={helperTextPassword}
                      onChange={this.handleChange}
                      name="password"
                      value={password}
                      required
                      type="password"
                      id="password-mobile-signin"
                      label="Password"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <div style={{ color: "#0077be" }}>
                      <Link
                        to={{
                          pathname: `/signup`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        not registered? sign up
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "10px" }} item>
                    <div style={{ color: "#0077be" }}>
                      <Link to="/signup">forgot password?</Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "25px" }} item>
                    <Button
                      type="submit"
                      size="large"
                      onClick={this.handleSubmit2}
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
                <Grid style={{ marginTop: "20px" }} item>
                  <div style={{ textAlign: "center" }}>or signin</div>
                </Grid>
                <Grid style={{ marginTop: "25px" }} item>
                  <Button
                    size="large"
                    fullWidth
                    startIcon={<FacebookIcon />}
                    variant="contained"
                    color="primary"
                  >
                    with facebook
                  </Button>
                </Grid>
              </div>
            )}
            {!isMobileOnly && (
              <div>
                <form style={{ width: "500px" }} noValidate autoComplete="off">
                  <Grid item>
                    <TextField
                      error={errorEmail}
                      helperText={helperTextEmail}
                      onChange={this.handleChange}
                      value={email}
                      required
                      name="email"
                      type="email"
                      id="email-signin"
                      label="Email"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorPassword}
                      helperText={helperTextPassword}
                      onChange={this.handleChange}
                      name="password"
                      value={password}
                      required
                      type="password"
                      id="password-signin"
                      label="Password"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <div style={{ color: "#0077be", fontSize: "14px" }}>
                      <Link
                        to={{
                          pathname: `/signup`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        not registered? sign up
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "10px" }} item>
                    <div style={{ color: "#0077be", fontSize: "14px" }}>
                      <Link to="/signup">forgot password?</Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "25px" }} item>
                    <Button
                      type="submit"
                      size="large"
                      onClick={this.handleSubmit2}
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
                <Grid style={{ marginTop: "20px" }} item>
                  <div style={{ textAlign: "center" }}>OR</div>
                </Grid>
                <Grid style={{ marginTop: "25px" }} item>
                  <Button
                    size="large"
                    startIcon={<FacebookIcon />}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Continue with facebook
                  </Button>
                </Grid>
              </div>
            )}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Login;

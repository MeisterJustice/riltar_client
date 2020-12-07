import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { isMobileOnly } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import Alerts from "../general-components/Alert";

class SignupAsBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      isBusiness: true,
      password: "",
      comfirmPassword: "",
      checked: false,
      errorFirstName: false,
      helperTextFirstName: "",
      errorLastName: false,
      helperTextLastName: "",
      errorUsername: false,
      helperTextUsername: "",
      errorEmail: false,
      helperTextEmail: "",
      errorPhone: false,
      helperTextPhone: "",
      errorPassword: false,
      helperTextPassword: "",
      errorComfirmPassword: false,
      helperTextComfirmPassword: "",
      textColor: "black",
      linkColor: "blue",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit2 = (e) => {
    e.preventDefault();
    if (
      this.state.checked &&
      this.state.email &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.password &&
      this.state.password.length > 7 &&
      this.state.comfirmPassword &&
      this.state.username &&
      this.state.phone &&
      this.state.phone.length === 11
    ) {
      this.props
        .onAuth("signup", {
          email: this.state.email,
          password: this.state.password,
          comfirmPassword: this.state.comfirmPassword,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          phone: this.state.phone,
          isBusiness: this.state.isBusiness,
        })
        .then(() => {
          if (this.props.location.query) {
            this.props.history.push(this.props.location.query.backUrl);
          } else {
            this.props.history.push("/");
          }
        })
        .catch(() => {
          this.setState({ comfirmPassword: "" });
          return;
        });
    } else {
      if (!this.state.checked) {
        this.setState({ textColor: "red", linkColor: "red" });
      } else {
        this.setState({ errorEmail: false, helperTextEmail: "" });
      }
      if (!this.state.email || this.state.email.length === 0) {
        this.setState({ errorEmail: true, helperTextEmail: "required" });
      } else {
        this.setState({ errorEmail: false, helperTextEmail: "" });
      }
      if (!this.state.firstName || this.state.firstName.length === 0) {
        this.setState({
          errorFirstName: true,
          helperTextFirstName: "required",
        });
      } else {
        this.setState({ errorFirstName: false, helperTextFirstName: "" });
      }
      if (!this.state.lastName || this.state.lastName.length === 0) {
        this.setState({ errorLastName: true, helperTextLastName: "required" });
      } else {
        this.setState({ errorLastName: false, helperTextLastName: "" });
      }
      if (!this.state.username || this.state.username.length === 0) {
        this.setState({ errorUsername: true, helperTextUsername: "required" });
      } else {
        this.setState({ errorUsername: false, helperTextUsername: "" });
      }
      if (!this.state.phone || this.state.phone.length === 0) {
        this.setState({ errorPhone: true, helperTextPhone: "required" });
      } else {
        this.setState({ errorPhone: false, helperTextPhone: "" });
      }
      if (this.state.phone.length !== 11) {
        this.setState({
          errorPhone: true,
          helperTextPhone: "input a valid phone number",
        });
      } else {
        this.setState({ errorPhone: false, helperTextPhone: "" });
      }
      if (!this.state.password || this.state.password.length === 0) {
        this.setState({ errorPassword: true, helperTextPassword: "required" });
      } else {
        this.setState({ errorPassword: false, helperTextPassword: "" });
      }
      if (this.state.password.length > 0 && this.state.password.length <= 7) {
        this.setState({
          errorPassword: true,
          helperTextPassword: "password must be greater than 7",
        });
      } else {
        this.setState({ errorPassword: false, helperTextPassword: "" });
      }
      if (
        !this.state.comfirmPassword ||
        this.state.comfirmPassword.length === 0
      ) {
        this.setState({
          errorComfirmPassword: true,
          helperTextComfirmPassword: "required",
        });
      } else {
        this.setState({
          errorComfirmPassword: false,
          helperTextComfirmPassword: "",
        });
      }
    }
  };

  handleCheckChange = (e) => {
    this.setState({ checked: true, textColor: "black", linkColor: "blue" });
  };
  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      username,
      phone,
      comfirmPassword,
      errorEmail,
      helperTextEmail,
      errorFirstName,
      helperTextFirstName,
      errorLastName,
      helperTextLastName,
      errorPhone,
      helperTextPhone,
      errorPassword,
      helperTextPassword,
      errorUsername,
      helperTextUsername,
      errorComfirmPassword,
      helperTextComfirmPassword,
      textColor,
      linkColor,
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
            <Grid style={{ marginBottom: "0", paddingTop: "30px" }} item>
              <h1
                style={{ fontSize: "40px", color: "blue", fontStyle: "italic" }}
              >
                riltar
              </h1>
            </Grid>
            <Grid style={{ marginTop: "0" }} item>
              <div>Sign up as a riltar business</div>
            </Grid>
            <Grid item>
              {errors.message && (
                <Alerts message={errors.message} severity="error"></Alerts>
              )}
            </Grid>
            {isMobileOnly && (
              <div>
                <form
                  onSubmit={this.handleSubmit}
                  style={{ marginTop: "10px" }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid item>
                    <TextField
                      error={errorFirstName}
                      helperText={helperTextFirstName}
                      onChange={this.handleChange}
                      value={firstName}
                      required
                      name="firstName"
                      id="first-name-mobile"
                      label="First Name"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorLastName}
                      helperText={helperTextLastName}
                      onChange={this.handleChange}
                      value={lastName}
                      required
                      name="lastName"
                      id="last-name-mobile"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorUsername}
                      helperText={helperTextUsername}
                      onChange={this.handleChange}
                      value={username}
                      required
                      name="username"
                      id="business-name-mobile"
                      label="Business Name"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorEmail}
                      type="email"
                      helperText={helperTextEmail}
                      onChange={this.handleChange}
                      value={email}
                      required
                      name="email"
                      id="email-mobile"
                      label="Email"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorPhone}
                      helperText={helperTextPhone}
                      onChange={this.handleChange}
                      value={phone}
                      required
                      name="phone"
                      type="number"
                      id="phone-number-mobile"
                      label="Phone Number"
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
                      id="password-mobile"
                      label="Password"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorComfirmPassword}
                      helperText={helperTextComfirmPassword}
                      onChange={this.handleChange}
                      name="comfirmPassword"
                      value={comfirmPassword}
                      required
                      type="password"
                      id="comfirm-password-mobile"
                      label="Comfirm Password"
                    />
                  </Grid>
                  <Grid style={{ marginTop: "10px" }} item>
                    <div style={{ fontSize: "14px" }}>
                      <Link
                        to={{
                          pathname: `/signin`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        Already registered? Signin
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "5px" }} item>
                    <div style={{ fontSize: "14px" }}>
                      <Link
                        to={{
                          pathname: `/signup/buyer`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        Register as a buyer instead?
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "10px" }} item>
                    {!this.state.checked && (
                      <Checkbox
                        required
                        checked={this.checked}
                        onChange={this.handleCheckChange}
                        name="checked"
                        color="primary"
                      />
                    )}
                    {this.state.checked && (
                      <Checkbox
                        required
                        checked={true}
                        onChange={this.handleCheckChange}
                        name="checked"
                        color="primary"
                      />
                    )}
                    <span style={{ fontSize: "13px", color: textColor }}>
                      i agree to the{" "}
                      <Link style={{ color: linkColor }} to="/privacy">
                        terms of service
                      </Link>
                    </span>
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
                      Sign Up
                    </Button>
                  </Grid>
                </form>
                <Grid style={{ marginTop: "20px" }} item>
                  <div style={{ textAlign: "center" }}>or signin</div>
                </Grid>
                <Grid style={{ marginTop: "25px", paddingBottom: "40px" }} item>
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
                      error={errorFirstName}
                      helperText={helperTextFirstName}
                      onChange={this.handleChange}
                      value={firstName}
                      required
                      name="firstName"
                      id="first-name"
                      label="First Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorLastName}
                      helperText={helperTextLastName}
                      onChange={this.handleChange}
                      value={lastName}
                      required
                      name="lastName"
                      id="last-name"
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorUsername}
                      helperText={helperTextUsername}
                      onChange={this.handleChange}
                      required
                      name="username"
                      id="business-name"
                      label="Business Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorEmail}
                      helperText={helperTextEmail}
                      onChange={this.handleChange}
                      value={email}
                      required
                      name="email"
                      id="email"
                      type="email"
                      label="Email"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorPhone}
                      helperText={helperTextPhone}
                      onChange={this.handleChange}
                      value={phone}
                      required
                      name="phone"
                      type="number"
                      id="phone-number"
                      label="Phone Number"
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
                      id="password"
                      label="Password"
                      fullWidth
                    />
                  </Grid>
                  <Grid style={{ marginTop: "15px" }} item>
                    <TextField
                      error={errorComfirmPassword}
                      helperText={helperTextComfirmPassword}
                      onChange={this.handleChange}
                      name="comfirmPassword"
                      value={comfirmPassword}
                      required
                      type="password"
                      id="comfirm-password"
                      label="Comfirm Password"
                      fullWidth
                    />
                  </Grid>

                  <Grid style={{ marginTop: "10px" }} item>
                    <div style={{ fontSize: "14px" }}>
                      <Link
                        to={{
                          pathname: `/signin`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        Already registered? Signin
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "5px" }} item>
                    <div style={{ fontSize: "14px" }}>
                      <Link
                        to={{
                          pathname: `/signup/buyer`,
                          query: {
                            backUrl: this.props.location.query
                              ? this.props.location.query.backUrl
                              : "/",
                          },
                        }}
                      >
                        Register as a buyer instead?
                      </Link>
                    </div>
                  </Grid>
                  <Grid style={{ marginTop: "10px" }} item>
                    {!this.state.checked && (
                      <Checkbox
                        required
                        checked={this.checked}
                        onChange={this.handleCheckChange}
                        name="checked"
                        color="primary"
                      />
                    )}
                    {this.state.checked && (
                      <Checkbox
                        required
                        checked={true}
                        onChange={this.handleCheckChange}
                        name="checked"
                        color="primary"
                      />
                    )}
                    <span style={{ fontSize: "13px", color: textColor }}>
                      i agree to the{" "}
                      <Link style={{ color: linkColor }} to="/privacy">
                        terms of service
                      </Link>
                    </span>
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
                      Sign Up
                    </Button>
                  </Grid>
                </form>
                <Grid style={{ marginTop: "20px" }} item>
                  <div style={{ textAlign: "center" }}>OR</div>
                </Grid>
                <Grid style={{ marginTop: "25px", paddingBottom: "60px" }} item>
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

export default SignupAsBusiness;

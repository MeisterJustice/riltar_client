import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { isMobileOnly } from "react-device-detect";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class SignupQuestion extends Component {
  render() {
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
                style={{ fontSize: "45px", color: "blue", fontStyle: "italic" }}
              >
                riltar
              </h1>
            </Grid>
            <Grid style={{ marginTop: "0" }} item>
              <h1>Sign up to riltar</h1>
            </Grid>
            {isMobileOnly && (
              <div>
                <Grid item>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: `/signup/buyer`,
                      query: {
                        backUrl: this.props.location.query
                          ? this.props.location.query.backUrl
                          : "/",
                      },
                    }}
                  >
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      As a Buyer
                    </Button>
                  </Link>
                </Grid>
                <Grid style={{ marginTop: "15px" }} item>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: `/signup/business`,
                      query: {
                        backUrl: this.props.location.query
                          ? this.props.location.query.backUrl
                          : "/",
                      },
                    }}
                  >
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      As a Business
                    </Button>
                  </Link>
                </Grid>
              </div>
            )}
            {!isMobileOnly && (
              <div style={{ width: "500px" }}>
                <Grid item>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: `/signup/buyer`,
                      query: {
                        backUrl: this.props.location.query
                          ? this.props.location.query.backUrl
                          : "/",
                      },
                    }}
                  >
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      As a Buyer
                    </Button>
                  </Link>
                </Grid>
                <Grid style={{ marginTop: "15px" }} item>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: `/signup/business`,
                      query: {
                        backUrl: this.props.location.query
                          ? this.props.location.query.backUrl
                          : "/",
                      },
                    }}
                  >
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      As a Business
                    </Button>
                  </Link>
                </Grid>
              </div>
            )}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SignupQuestion;

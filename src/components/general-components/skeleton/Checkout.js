import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    marginTop: -50,
    padding: 0,
  },
  magin: {
    marginTop: "20px",
  },
});

const CheckoutPc = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={120} />
      <Container className={classes.magin}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Skeleton variant="text" width={150} />
            <Skeleton variant="rect" width="100%" height={160} />
            <Box mt={3}>
              <Skeleton variant="text" width={120} />
              <Box display={{ xs: "none", md: "block" }}>
                <Skeleton variant="rect" width="100%" height={260} />
              </Box>
              <Box display={{ xs: "block", md: "none" }}>
                <Skeleton variant="rect" width="100%" height="50vh" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box display={{ xs: "none", md: "block" }}>
              <Skeleton variant="text" width={70} />
              <Box mt={2}>
                <Skeleton variant="rect" width="100%" height={180} />
              </Box>
              <Box mt={2}>
                <Skeleton variant="text" width={90} />
                <Skeleton variant="rect" width="100%" height={230} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CheckoutPc;

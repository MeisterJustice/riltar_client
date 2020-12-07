import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    marginTop: -50,
    padding: 0,
  },
  magin: {
    marginTop: "10px",
  },
});

const DiscoverSkeletonMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={170} />
      <Container className={classes.magin}>
        <Skeleton variant="rect" width="100%" height="10vh" />
        <Box mt={4}>
          <Grid spacing={1} container>
            <Grid item xs={6}>
              <Skeleton variant="rect" width="100%" height="50vh" />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rect" width="100%" height="50vh" />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rect" width="100%" height="20vh" />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rect" width="100%" height="20vh" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default DiscoverSkeletonMobile;

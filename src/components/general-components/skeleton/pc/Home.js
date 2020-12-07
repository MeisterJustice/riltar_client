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
    marginTop: "55px",
  },
});

const HomeSkeletonPc = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={160} />
      <Box mx={8} className={classes.magin}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Skeleton variant="rect" width="100%" height={400} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rect" width="100%" height={300} />
            <Box mt={2}>
              <Skeleton variant="rect" width="100%" height={80} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="rect" width="100%" height={400} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeSkeletonPc;

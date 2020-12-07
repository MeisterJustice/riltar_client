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

const DiscoverPc = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={160} />
      <Box mx={10} className={classes.magin}>
        <Skeleton height={90} />
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Skeleton variant="rect" width="100%" height={350} />
          </Grid>
          <Grid item xs={9}>
            <Skeleton variant="text" width={50} />
            <Box mt={2}>
              <Skeleton variant="rect" width="100%" height={200} />
            </Box>
            <Box mt={2}>
              <Skeleton variant="rect" width="100%" height={100} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DiscoverPc;

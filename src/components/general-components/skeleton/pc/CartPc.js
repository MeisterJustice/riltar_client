import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

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

const CartPc = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={160} />
      <Box mx={10} className={classes.magin}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Skeleton height={155} />
            <Box mt={2}>
              <Skeleton variant="rect" width="100%" height={260} />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartPc;

import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box } from "@material-ui/core";

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

const CartSkeletonMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={170} />
      <Container className={classes.magin}>
        <Skeleton variant="rect" width="100%" height="10vh" />
        <Box mt={4}>
          <Skeleton variant="rect" width="100%" height="30vh" />
        </Box>
        <Box mt={3}>
          <Skeleton variant="rect" width="100%" height="30vh" />
        </Box>
      </Container>
    </div>
  );
};

export default CartSkeletonMobile;

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

const SellSk = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height="20vh" />
      <Container className={classes.magin}>
        <Box
          height="70vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box display={{ xs: "none", md: "block" }} mt={2}>
            <Skeleton variant="text" width={130} />
            <Skeleton variant="rect" width={800} height="30vh" />
          </Box>
          <Box display={{ xs: "none", md: "block" }} mt={2}>
            <Skeleton variant="text" width={130} />
            <Skeleton variant="rect" width={800} height="30vh" />
          </Box>
          <Box display={{ xs: "block", md: "none" }} mt={2}>
            <Skeleton variant="text" width={90} />
            <Skeleton variant="rect" width={300} height="15vh" />
          </Box>
          <Box display={{ xs: "block", md: "none" }} mt={2}>
            <Skeleton variant="text" width={90} />
            <Skeleton variant="rect" width={300} height="25vh" />
          </Box>
          <Box display={{ xs: "block", md: "none" }} mt={2}>
            <Skeleton variant="text" width={90} />
            <Skeleton variant="rect" width={300} height="5vh" />
          </Box>
          <Box display={{ xs: "block", md: "none" }} mt={2}>
            <Skeleton variant="text" width={90} />
            <Skeleton variant="rect" width={300} height="5vh" />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SellSk;

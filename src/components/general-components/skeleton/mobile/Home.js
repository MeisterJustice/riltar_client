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
    marginTop: "10px",
  },
});

const HomeSkeletonMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={170} />
      <Container className={classes.magin}>
        <Skeleton variant="rect" width="100%" height={200} />
        <Box mt={2}>
          <Skeleton variant="rect" width="100%" height={50} />
        </Box>
        <Box mt={7} display="flex" justifyContent="space-between">
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={50} />
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((data, index) => (
              <Grid key={index} item xs={3}>
                <Skeleton variant="rect" width="100%" height={75} />
                <Box mt={1.5}>
                  <Skeleton variant="text" width={30} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((data, index) => (
              <Grid key={index} item xs={3}>
                <Skeleton variant="rect" width="100%" height={75} />
                <Box mt={1.5}>
                  <Skeleton variant="text" width={30} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default HomeSkeletonMobile;

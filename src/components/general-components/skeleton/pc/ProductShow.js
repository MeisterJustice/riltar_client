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

const ProductShowSkPc = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={160} />
      <Container className={classes.magin}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Skeleton variant="rect" width="100%" height="55vh" />
            <Box mt={1.5}>
              <Grid container spacing={1}>
                {[1, 2, 3, 4].map((data, i) => (
                  <Grid key={i} item xs={3}>
                    <Skeleton variant="rect" width="100%" height="5vh" />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Skeleton variant="text" width={150} />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="90%" />
            <Box mt={1}>
              <Skeleton variant="text" width={130} />
            </Box>
            <Box mt={1.5}>
              <Skeleton variant="text" height={60} width={170} />
            </Box>
            <Box mt={1.5}>
              <Skeleton variant="text" width={250} />
            </Box>
            <Box mt={1.5}>
              <Skeleton variant="text" width={90} />
            </Box>
            <Box mt={2}>
              <Skeleton variant="rect" height="7vh" width="100%" />
            </Box>
            <Box mt={2}>
              <Skeleton variant="text" width="80%" />
            </Box>
            <Box mt={1}>
              <Skeleton variant="text" width="80%" />
            </Box>
            <Box mt={1}>
              <Skeleton variant="text" width="80%" />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              width={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton variant="circle" width={150} height={150} />
              <Box display="flex" justifyContent="center" width={1} mt={1.5}>
                <Skeleton variant="text" width="60%" />
              </Box>
              <Box display="flex" justifyContent="center" width={1} mt={1}>
                <Skeleton variant="text" width="65%" />
              </Box>
              <Box display="flex" justifyContent="center" width={1} mt={1}>
                <Skeleton variant="text" width="70%" />
              </Box>
              <Box display="flex" justifyContent="center" width={1} mt={1}>
                <Skeleton variant="text" width="40%" />
              </Box>
              <Box width={1} mt={2}>
                <Skeleton variant="rect" height="5vh" width="100%" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductShowSkPc;

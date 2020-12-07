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

const ProductShowSkMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton height={170} />
      <Container className={classes.magin}>
        <Box>
          <Skeleton variant="rect" width="100%" height="35vh" />
          <Box mt={1.5}>
            <Grid container spacing={1}>
              {[1, 2, 3, 4].map((data, i) => (
                <Grid key={i} item xs={3}>
                  <Skeleton variant="rect" width="100%" height="6vh" />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box mt={2}>
          <Skeleton variant="text" height={40} width={100} />
          <Box mt={1.5}>
            <Skeleton variant="text" width={250} />
          </Box>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="90%" />
          <Box mt={1}>
            <Skeleton variant="text" width="50%" />
          </Box>
          <Box mt={1}>
            <Skeleton variant="text" width="50%" />
          </Box>
          <Box mt={1}>
            <Skeleton variant="text" width="50%" />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ProductShowSkMobile;

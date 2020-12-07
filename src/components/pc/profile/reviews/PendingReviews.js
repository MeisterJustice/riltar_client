import React, { useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Header from "../components/Header";
import Menu from "../components/Menu";
import ReviewItem from "./Item";
import { connect } from "react-redux";
import {
  fetchUnRatedOrders,
  postRating,
} from "../../../../store/actions/ratings";
import { removeError } from "../../../../store/actions/errors";

const PendingReviewsPc = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchUnRatedOrders(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  props.history.listen(() => {
    removeError();
  });
  return (
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <Box pb={5} mt={2}>
        <Container>
          <Header />
          <Grid spacing={5} container>
            <Grid item xs={3}>
              <Menu {...props} />
            </Grid>
            <Grid item xs={9}>
              <Box width={1}>
                <Box fontSize={23} fontWeight={600} mb={2}>
                  Your Pending Reviews
                </Box>

                <Box>
                  {done && (
                    <ReviewItem
                      orders={props.ratings}
                      postRating={postRating}
                      currentUser={props.currentUser}
                      errors={props.errors}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    ratings: state.ratings,
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  fetchUnRatedOrders,
  postRating,
  removeError,
})(PendingReviewsPc);

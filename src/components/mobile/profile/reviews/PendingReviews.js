import React, { useEffect } from "react";
import { Box, Container } from "@material-ui/core";
import Header from "../components/Header";
import ReviewItem from "./Item";
import BottomMenu from "../components/BottomMenu";
import { connect } from "react-redux";
import {
  fetchUnRatedOrders,
  postRating,
} from "../../../../store/actions/ratings";
import { removeError } from "../../../../store/actions/errors";

const PendingReviewsMobile = (props) => {
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
    <Box>
      <Header text="Your Pending Reviews" />
      <Box mt={5} mb={15}>
        <Container>
          <Box width={1}>
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
        </Container>
      </Box>
      <BottomMenu />
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
})(PendingReviewsMobile);

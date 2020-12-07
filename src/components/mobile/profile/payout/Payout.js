import React, { useEffect } from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import Empty from "../../../pc/profile/components/Empty";
import PayoutItem from "./Item";
import BottomMenu from "../components/BottomMenu";
import { connect } from "react-redux";
import { fetchPayouts } from "../../../../store/actions/payout";

const PayoutMobile = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchPayouts(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      <Header text="Your Payouts" />
      <Box mb={15} mt={5}>
        <Container>
          <Box>
            {done && <PayoutItem payouts={props.payouts} />}
            {!done && (
              <Box
                height="90vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress color="gray" />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      <BottomMenu />
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    payouts: state.payouts,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchPayouts,
})(PayoutMobile);

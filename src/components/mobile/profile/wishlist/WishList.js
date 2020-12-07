import React, { useEffect } from "react";
import { Box, Container, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import WishListItem from "./Item";
import BottomMenu from "../components/BottomMenu";
import { connect } from "react-redux";
import { fetchFavorites } from "../../../../store/actions/wishlist";

const WishListMobile = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchFavorites(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      <Header text="Your Wish List" />
      <Box mb={15} mt={3}>
        <Container>
          {done && (
            <WishListItem
              favorites={props.favorites}
              currentUser={props.currentUser}
            />
          )}
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
        </Container>
      </Box>
      <BottomMenu />
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchFavorites,
})(WishListMobile);

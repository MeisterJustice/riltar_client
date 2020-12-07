import React, { useEffect } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Item from "./Item";
import { connect } from "react-redux";
import { fetchFavorites } from "../../../../store/actions/wishlist";

const WishlistPc = (props) => {
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchFavorites(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
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
                  Your WishList
                </Box>

                <Box mt={1}>
                  {done && (
                    <Item
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
    favorites: state.favorites,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchFavorites,
})(WishlistPc);

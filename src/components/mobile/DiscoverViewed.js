import React, { useEffect, useState } from "react";
import { fetchRecentProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import Discover from "../general-components/mobile/DiscoverView";
import DiscoverSkeletonMobile from "../general-components/skeleton/mobile/Discover";

const DiscoverViewedMobile = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchRecentProducts(50, props.currentUser.user.id);
    await props.fetchFavorites(props.currentUser.user.id);
    await setDone(true);
  }

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Box>
      {done ? (
        <Discover
          {...props}
          products={props.recent}
          currentUser={props.currentUser}
          logout={props.logout}
          discoverMessage={"Your Recently Viewed Items"}
        />
      ) : (
        <DiscoverSkeletonMobile />
      )}
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    recent: state.recent,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchRecentProducts,
  fetchFavorites,
  postFavorite,
})(DiscoverViewedMobile);

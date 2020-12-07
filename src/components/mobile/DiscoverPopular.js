import React, { useEffect, useState } from "react";
import { fetchPopularProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import Discover from "../general-components/mobile/Discover";
import DiscoverSkeletonMobile from "../general-components/skeleton/mobile/Discover";

const DiscoverPopularMobile = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchPopularProducts(50);
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
          products={props.popular}
          currentUser={props.currentUser}
          logout={props.logout}
          discoverMessage={"Discover Popular Products"}
        />
      ) : (
        <DiscoverSkeletonMobile />
      )}
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    popular: state.popular,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchPopularProducts,
  fetchFavorites,
  postFavorite,
})(DiscoverPopularMobile);

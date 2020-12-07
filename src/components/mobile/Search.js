import React, { useEffect, useState } from "react";
import { fetchSearchResult } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import Discover from "../general-components/mobile/Discover";
import DiscoverSkeletonMobile from "../general-components/skeleton/mobile/Discover";

const SearchMobile = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchSearchResult(props.text);
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
          products={props.products}
          currentUser={props.currentUser}
          logout={props.logout}
          discoverMessage={props.text}
        />
      ) : (
        <DiscoverSkeletonMobile />
      )}
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchSearchResult,
  fetchFavorites,
  postFavorite,
})(SearchMobile);

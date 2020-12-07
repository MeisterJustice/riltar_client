import React, { useEffect, useState } from "react";
import { fetchRecentProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { fetchCategories } from "../../store/actions/categories";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import Discover from "../general-components/pc/discoverView/Discover";

const DiscoverViewedPc = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchCategories();
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
          discoverMessage={"Your Recently Viewd Items"}
          products={props.recent}
          recent={true}
          favorites={props.favorites}
          postFavorite={props.postFavorite}
          categories={props.categories}
          user_id={props.currentUser.user.id}
        />
      ) : (
        <DiscoverPc />
      )}
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    recent: state.recent,
    categories: state.categories,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchRecentProducts,
  fetchFavorites,
  fetchCategories,
  postFavorite,
})(DiscoverViewedPc);

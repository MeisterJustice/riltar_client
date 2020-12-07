import React, { useEffect, useState } from "react";
import Discover from "../general-components/pc/discover/Discover";
import { fetchPopularProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { fetchCategories } from "../../store/actions/categories";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";

const DiscoverPopularPc = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchCategories();
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
          discoverMessage={"Discover Popular Products"}
          products={props.popular}
          favorites={props.favorites}
          postFavorite={postFavorite}
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
    popular: state.popular,
    categories: state.categories,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchPopularProducts,
  fetchFavorites,
  fetchCategories,
  postFavorite,
})(DiscoverPopularPc);

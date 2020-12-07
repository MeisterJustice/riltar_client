import React, { useEffect, useState } from "react";
import Discover from "../general-components/pc/discover/Discover";
import { fetchSearchResult } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { fetchCategories } from "../../store/actions/categories";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";

const SearchPc = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchCategories();
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
          discoverMessage={props.text}
          products={props.products}
          favorites={props.favorites}
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
    products: state.products,
    categories: state.categories,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchSearchResult,
  fetchCategories,
  postFavorite,
  fetchFavorites,
})(SearchPc);

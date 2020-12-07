import React, { useEffect, useState } from "react";
import Discover from "../general-components/pc/discover/Discover";
import { fetchBudgetProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { fetchCategories } from "../../store/actions/categories";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";

const DiscoverBudgetPc = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchCategories();
    await props.fetchBudgetProducts(50);
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
          discoverMessage={"Discover Low Priced Items"}
          products={props.budget}
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
    budget: state.budget,
    categories: state.categories,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchBudgetProducts,
  fetchCategories,
  postFavorite,
  fetchFavorites,
})(DiscoverBudgetPc);

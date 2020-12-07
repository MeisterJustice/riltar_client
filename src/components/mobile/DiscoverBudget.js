import React, { useEffect, useState } from "react";
import { fetchBudgetProducts } from "../../store/actions/products";
import { fetchFavorites, postFavorite } from "../../store/actions/wishlist";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import Discover from "../general-components/mobile/Discover";
import DiscoverSkeletonMobile from "../general-components/skeleton/mobile/Discover";

const DiscoverBudgetMobile = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
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
          products={props.budget}
          currentUser={props.currentUser}
          logout={props.logout}
          discoverMessage={"Discover Low Priced Products"}
        />
      ) : (
        <DiscoverSkeletonMobile />
      )}
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    budget: state.budget,
    favorites: state.favorites,
  };
}
export default connect(mapStateToProps, {
  fetchBudgetProducts,
  fetchFavorites,
  postFavorite,
})(DiscoverBudgetMobile);

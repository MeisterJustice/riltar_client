import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import NavbarPc from "../../general-components/pc/NavbarPc";
import Container from "@material-ui/core/Container";
import FooterPc from "../../general-components/pc/FooterPc";
import {
  fetchBrowseProducts,
  fetchBudgetProducts,
  fetchPopularProducts,
  fetchRecentProducts,
} from "../../../store/actions/products";
import { fetchCategories } from "../../../store/actions/categories";
import { connect } from "react-redux";
import Categories from "./Categories";
import Center from "./Center";
import Welcome from "./Welcome";
import Budget from "./Budget";
import Popular from "./Popular";
import { CircularProgress } from "@material-ui/core";
import Recent from "./Recent";
import Browse from "./Browse";

const HomepagePc = (props) => {
  const [budgetDone, setBudgetDone] = useState(false);
  const [popularDone, setPopularDone] = useState(false);
  const [recentDone, setRecentDone] = useState(false);
  const [browseDone, setBrowseDone] = useState(false);
  async function fetch() {
    await props.fetchCategories();
    await props.fetchBudgetProducts(5);
    await setBudgetDone(true);
    await props.fetchPopularProducts(5);
    await setPopularDone(true);
    await props.fetchRecentProducts(5, props.currentUser.user.id);
    await setRecentDone(true);
    await props.fetchBrowseProducts(28);
    setBrowseDone(true);
  }

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div id="grad">
      <Box style={{ position: "absolute", width: "100%" }}>
        <NavbarPc {...props} />
        <Box mt={13}>
          <Container>
            <Box width={1} height={500}>
              <Box
                height={1}
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="space-around"
              >
                <Categories categories={props.categories} />
                <Center />
                <Welcome
                  currentUser={props.currentUser}
                  logout={props.logout}
                />
              </Box>
            </Box>
          </Container>
        </Box>
        {budgetDone ? (
          <Budget products={props.budget} />
        ) : (
          <Box
            mt={5}
            height="150"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="gray" />
          </Box>
        )}
        {popularDone ? (
          <Popular products={props.popular} />
        ) : (
          <Box
            mt={5}
            height="150"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="gray" />
          </Box>
        )}
        {props.currentUser.isAuthenticated && (
          <Box>
            {recentDone ? (
              <Recent products={props.recent} />
            ) : (
              <Box
                mt={5}
                height="150"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress color="gray" />
              </Box>
            )}
          </Box>
        )}
        {browseDone ? (
          <Browse products={props.browse} />
        ) : (
          <Box
            mt={5}
            height="150"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="gray" />
          </Box>
        )}
        <FooterPc />
      </Box>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    browse: state.browse,
    budget: state.budget,
    popular: state.popular,
    recent: state.recent,
    categories: state.categories,
  };
}
export default connect(mapStateToProps, {
  fetchBrowseProducts,
  fetchBudgetProducts,
  fetchPopularProducts,
  fetchRecentProducts,
  fetchCategories,
})(HomepagePc);

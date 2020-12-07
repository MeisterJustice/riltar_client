import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Grid from "@material-ui/core/Grid";
import NavbarMobile from "../../general-components/mobile/NavbarMobile";
import SellButtonMobile from "../../general-components/mobile/SellButtonMobile";
import FooterMobile from "../../general-components/mobile/FooterMobile";
import Budget from "./Budget";
import Popular from "./Popular";
import Recent from "./Recent";
import Browse from "./Browse";
import {
  fetchBrowseProducts,
  fetchBudgetProducts,
  fetchPopularProducts,
  fetchRecentProducts,
} from "../../../store/actions/products";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const HomepageMobile = (props) => {
  const [budgetDone, setBudgetDone] = useState(false);
  const [popularDone, setPopularDone] = useState(false);
  const [recentDone, setRecentDone] = useState(false);
  const [browseDone, setBrowseDone] = useState(false);
  async function fetch() {
    await props.fetchBudgetProducts(4);
    await setBudgetDone(true);
    await props.fetchPopularProducts(4);
    await setPopularDone(true);
    await props.fetchRecentProducts(4, props.currentUser.user.id);
    await setRecentDone(true);
    await props.fetchBrowseProducts(28);
    setBrowseDone(true);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Box mb={10} style={{ position: "absolute", width: "100%" }}>
        <NavbarMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
        />
        <Box style={{ position: "absolute" }} id="grad">
          <Container>
            <Box
              height={200}
              mt={13}
              mb={1}
              borderRadius="20px"
              bgcolor="#fff5fc"
              boxShadow={1}
            >
              <img
                alt="home"
                title="home"
                src="home.gif"
                width="100%"
                height="100%"
                style={{ borderRadius: "20px" }}
              />
            </Box>
            <Box
              width={1}
              height={100}
              borderRadius="20px"
              bgcolor="white"
              boxShadow={1}
              mt={1}
              mx={0.2}
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Grid width={1} container spacing={1}>
                <Grid ml={1} item xs={3}>
                  <LazyLoad height={350} once>
                    <img
                      alt="title"
                      title="title"
                      width="100%"
                      height={70}
                      className="image"
                      src="heels.webp"
                    />
                  </LazyLoad>
                </Grid>
                <Grid ml={1} item xs={3}>
                  <LazyLoad height={350} once>
                    <img
                      alt="title"
                      title="title"
                      width="100%"
                      height={70}
                      className="image"
                      src="cosmetics.webp"
                    />
                  </LazyLoad>
                </Grid>
                <Grid ml={1} item xs={3}>
                  <LazyLoad height={350} once>
                    <img
                      alt="title"
                      title="title"
                      width="100%"
                      height={70}
                      className="image"
                      src="game.jpg"
                    />
                  </LazyLoad>
                </Grid>
                <Grid ml={1} item xs={3}>
                  <LazyLoad height={350} once>
                    <img
                      alt="title"
                      title="title"
                      width="100%"
                      height={70}
                      className="image"
                      src="shoe.webp"
                    />
                  </LazyLoad>
                </Grid>
              </Grid>
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
          </Container>
          <FooterMobile />
          <SellButtonMobile />
        </Box>
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
  };
}
export default connect(mapStateToProps, {
  fetchBrowseProducts,
  fetchBudgetProducts,
  fetchPopularProducts,
  fetchRecentProducts,
})(HomepageMobile);

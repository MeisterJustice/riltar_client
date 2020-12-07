import React, { Component, lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import DiscoverSkeletonMobile from "../../components/general-components/skeleton/mobile/Discover";
const DiscoverSubcategoryPc = lazy(() =>
  import("../../components/pc/DiscoverSubcategory")
);
const DiscoverSubcategoryMobile = lazy(() =>
  import("../../components/mobile/DiscoverSubcategory")
);

class DiscoverSubcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSnackbarOpen: false,
      snackbarMessage: "",
      isFavorite: true,
    };
  }

  handleFavoriteOpen = (e) => {
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: "Added to favorites",
    });
  };
  handleUnfavoriteOpen = (e) => {
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: "Removed from favorites",
    });
  };
  handleClose = (e) => {
    this.setState({ isSnackbarOpen: false });
  };
  render() {
    if (isMobileOnly) {
      return (
        <Suspense fallback={<DiscoverSkeletonMobile />}>
          <DiscoverSubcategoryMobile
            currentUser={this.props.currentUser}
            logout={this.props.logout}
            categoryName={`Computers`}
          />
        </Suspense>
      );
    }
    return (
      <Suspense fallback={<DiscoverPc />}>
        <DiscoverSubcategoryPc
          handleClose={this.handleClose}
          handleFavoriteOpen={this.handleFavoriteOpen}
          handleUnfavoriteOpen={this.handleUnfavoriteOpen}
          open={this.state.isSnackbarOpen}
          message={this.state.snackbarMessage}
          isFavorite={this.state.isFavorite}
          categoryName={"Electronics"}
        />
      </Suspense>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(DiscoverSubcategory);

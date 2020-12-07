import React, { lazy, Suspense, useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { removeError } from "../../store/actions/errors";
import { fetchProduct } from "../../store/actions/products";
import { logout } from "../../store/actions/auth";
import ProductShowSkPc from "../../components/general-components/skeleton/pc/ProductShow";
import ProductShowSkMobile from "../../components/general-components/skeleton/mobile/ProductShow";
const ProductShowPc = lazy(() =>
  import("../../components/pc/profileShow/ProductShow")
);
const ProductShowMobile = lazy(() =>
  import("../../components/mobile/productShow/ProductShow")
);

const ProductShow = (props) => {
  const [state, setStatee] = useState({
    isSnackbarOpen: false,
    snackbarMessage: "",
    isFavorite: true,
  });
  const [done, setDone] = useState(false);

  async function fetch() {
    await props.fetchProduct(
      props.currentUser.user.id,
      props.match.params.product_id
    );
    await setDone(true);
  }

  useEffect(() => {
    fetch();
  }, []);

  const handleFavoriteOpen = (e) => {
    setStatee({
      ...state,
      isSnackbarOpen: true,
      snackbarMessage: "Added to watchlist",
    });
  };
  const handleUnfavoriteOpen = (e) => {
    setStatee({
      ...state,
      isSnackbarOpen: true,
      snackbarMessage: "Removed from watchlist",
    });
  };

  const handleNegotiationOpen = (e) => {
    setStatee({
      ...state,
      isSnackbarOpen: true,
      snackbarMessage:
        "Message successfully sent to seller...Check Your Messages For Response",
    });
  };

  const handleClose = (e) => {
    setStatee({ ...state, isSnackbarOpen: false });
  };

  props.history.listen(() => {
    removeError();
  });
  if (isMobileOnly) {
    return (
      <Suspense fallback={<ProductShowSkMobile />}>
        {done ? (
          <ProductShowMobile
            {...props}
            currentUser={props.currentUser}
            logout={props.logout}
            handleClose={handleClose}
            handleFavoriteOpen={handleFavoriteOpen}
            handleUnfavoriteOpen={handleUnfavoriteOpen}
            handleNegotiationOpen={handleNegotiationOpen}
            open={state.isSnackbarOpen}
            message={state.snackbarMessage}
            isFavorite={state.isFavorite}
            product={props.product}
            errors={props.errors}
          />
        ) : (
          <ProductShowSkMobile />
        )}
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<ProductShowSkPc />}>
      {done ? (
        <ProductShowPc
          {...props}
          errors={props.errors}
          product={props.product}
          handleClose={handleClose}
          handleFavoriteOpen={handleFavoriteOpen}
          handleUnfavoriteOpen={handleUnfavoriteOpen}
          handleNegotiationOpen={handleNegotiationOpen}
          open={state.isSnackbarOpen}
          message={state.snackbarMessage}
          isFavorite={state.isFavorite}
        />
      ) : (
        <ProductShowSkPc />
      )}
    </Suspense>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    product: state.product,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  logout,
  fetchProduct,
  removeError,
})(ProductShow);

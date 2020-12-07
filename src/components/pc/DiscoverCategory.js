import React from "react";
import Discover from "../general-components/pc/discover/Discover";

const DiscoverCategoryPc = ({
  categoryName,
  isFavorite,
  currentUser,
  logout,
  open,
  handleClose,
  handleFavoriteOpen,
  handleUnfavoriteOpen,
  message,
}) => {
  return (
    <Discover
      isFavorite={isFavorite}
      currentUser={currentUser}
      logout={logout}
      open={open}
      handleClose={handleClose}
      handleFavoriteOpen={handleFavoriteOpen}
      handleUnfavoriteOpen={handleUnfavoriteOpen}
      message={message}
      discoverMessage={`Browse ${categoryName}`}
    />
  );
};

export default DiscoverCategoryPc;

import React, { useEffect, useState, lazy, Suspense } from "react";
import { isMobileOnly } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import DiscoverPc from "../../components/general-components/skeleton/pc/Discover";
import DiscoverSkeletonMobile from "../../components/general-components/skeleton/mobile/Discover";

const SearchPc = lazy(() => import("../../components/pc/Search"));
const SearchMobile = lazy(() => import("../../components/mobile/Search"));

const SearchResult = (props) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let link = window.location.pathname
      .toLowerCase()
      .split("/")
      .join("")
      .split("-")
      .join(" ")
      .split("$")
      .join("/")
      .split("&")
      .join(".");
    setText(link);
  }, []);
  if (isMobileOnly) {
    return (
      <Suspense fallback={<DiscoverSkeletonMobile />}>
        <SearchMobile
          {...props}
          currentUser={props.currentUser}
          logout={props.logout}
          text={text}
        />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<DiscoverPc />}>
        <SearchPc {...props} text={text} />
      </Suspense>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(SearchResult);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../../../store/actions/auth";
import MenuItem from "./MenuItem";

const Menu = (props) => {
  const [done, setDone] = useState(false);
  async function fetch() {
    await props.fetchUser(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  return <div>{done && <MenuItem user={props.user} />}</div>;
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    user: state.user,
  };
}

export default connect(mapStateToProps, {
  fetchUser,
})(Menu);

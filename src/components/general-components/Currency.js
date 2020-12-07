import React from "react";
import { Box } from "@material-ui/core";
var formatter = new Intl.NumberFormat("en-US");

const Currency = (props) => {
  return <Box className="money">&#8358; {formatter.format(props.price)}</Box>;
};

export default Currency;

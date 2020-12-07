import React from "react";
import { Box } from "@material-ui/core";
import LazyLoad from "react-lazyload";

const Image = (props) => {
  return (
    <Box height="90%">
      <LazyLoad height="100%" once>
        <img
          alt="title"
          title="title"
          width="100%"
          height="50%"
          className="image"
          src={props.image}
        />
      </LazyLoad>
    </Box>
  );
};

export default Image;

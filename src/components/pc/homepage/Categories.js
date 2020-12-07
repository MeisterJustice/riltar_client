import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

const Categories = (props) => {
  return (
    <Box
      boxShadow={1}
      borderRadius="20px"
      className="background"
      px={2}
      width="19%"
      mx={3}
      my={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="space-between"
    >
      {props.categories.map((category, index) => (
        <Box
          key={category._id}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Link
            style={{ fontSize: "14px" }}
            className="link"
            to={{
              pathname: `/categories/${category._id}/products`,
            }}
          >
            {category.title}
          </Link>
          <Box>{">"}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default Categories;

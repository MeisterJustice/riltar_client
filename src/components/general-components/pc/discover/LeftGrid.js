import React from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const LeftGrid = (props) => {
  return (
    <Box
      fontSize={15}
      mx={3}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="space-between"
    >
      {props.categories.map((category, index) => (
        <Box key={category._id} my={2}>
          <Box mb={2} fontWeight="bold">
            {category.title}
          </Box>
          {category.subCategories.map((sub, indexx) => (
            <Box key={sub._id} mt={1}>
              <Link to={`/subcategories/${sub._id}/products`} className="link">
                {sub.title}
              </Link>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default LeftGrid;

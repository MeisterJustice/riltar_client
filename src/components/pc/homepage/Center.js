import React from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const Center = (props) => {
  return (
    <Box
      my={2}
      flexGrow={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        mb={1}
        flexGrow={1}
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
        height="150px"
        borderRadius="20px"
        bgcolor="white"
        boxShadow={1}
        mt={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
      >
        <Box width={1} m={2}>
          <Link to="#" className="cursor link">
            <Box p={0} m={0}>
              <img
                width="125"
                className="image"
                height="90"
                src="heels.webp"
                alt="products below 2k"
                title="Products below 2k"
              />
            </Box>
          </Link>
        </Box>
        <Box width={1} m={2}>
          <Link to="#" className="cursor link">
            <Box p={0} m={0}>
              <img
                width="125"
                className="image"
                height="90"
                src="cosmetics.webp"
                alt="hottest cosmetics"
                title="Hottest cosmetics"
              />
            </Box>
          </Link>
        </Box>
        <Box width={1} m={2}>
          <Link to="#" className="cursor link">
            <Box p={0} m={0}>
              <img
                width="125"
                className="image"
                height="90"
                src="game.jpg"
                alt="video games"
                title="video games"
              />
            </Box>
          </Link>
        </Box>
        <Box width={1} m={2}>
          <Link to="#" className="cursor link">
            <Box p={0} m={0}>
              <img
                width="125"
                className="image"
                height="90"
                src="shoe.webp"
                alt="Sports and fitness"
                title="Sports and fitness"
              />
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Center;

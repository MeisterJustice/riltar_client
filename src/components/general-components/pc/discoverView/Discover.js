import React from "react";
import Box from "@material-ui/core/Box";
import NavbarPc from "../NavbarPc";
import Grid from "@material-ui/core/Grid";
import FooterPc from "../FooterPc";
import LeftGrid from "./LeftGrid";
import RightGrid from "./RightGrid";

const Discover = (props) => {
  return (
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <NavbarPc {...props} />
      <Box pb={20} mt={20}>
        <Box mx={10}>
          <Box py={2} bgcolor="#24a5f0" color="#0300be">
            <Box ml={2} fontSize={18} fontWeight="bold">
              {props.discoverMessage}
            </Box>
          </Box>
          <Box width={1} mt={5}>
            <Grid container spacing={1}>
              <Grid className="background" item xs={3}>
                <LeftGrid categories={props.categories} />
              </Grid>
              <Grid xs={9} item>
                <RightGrid
                  products={props.products}
                  favorites={props.favorites}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <FooterPc />
    </Box>
  );
};

export default Discover;

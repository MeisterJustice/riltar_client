import React from "react";
import { Box, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SellHeader = React.memo((props) => {
  let history = useHistory();
  return (
    <Box bgcolor="#0077be" m={0}>
      <Container>
        <Box
          height={60}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            color="#FFFFFF"
            onClick={() => history.push('/')}
            fontSize={30}
            fontStyle="italic"
            fontWeight="bold"
            className="cursor"
          >
            Riltar
          </Box>
          <Box
            onClick={() => history.goBack()}
            className="cursor"
            color="#FFFFFF"
          >
            Back
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default SellHeader;

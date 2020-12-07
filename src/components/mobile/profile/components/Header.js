import React from "react";
import { Avatar, Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  let history = useHistory();
  return (
    <Box p={1.5} bgcolor="#011B33" color="white">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Box alignSelf="center">
          <ArrowBackIcon
            style={{ marginTop: "2.5px" }}
            onClick={() => history.goBack()}
          />
        </Box>
        {props.photo && (
          <Box ml={2}>
            <Avatar alt={props.text} src={props.url} />
          </Box>
        )}
        <Box ml={1}>{props.text}</Box>
      </Box>
    </Box>
  );
};

export default Header;

import React from "react";
import { Box, Avatar, makeStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <Box
      pt={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box fontWeight={600} fontSize={25}>
          {props.user.firstName} {props.user.lastName}
        </Box>
        {props.user.averageRating > 0 && (
          <Box
            mt={0.8}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <Rating
                name="rating"
                title="rating"
                defaultValue={props.user.averageRating}
                size="small"
                precision={0.5}
                readOnly
              />
            </Box>
            <Box alignSelf="center" ml={1}>
              ({props.user.averageRating})
            </Box>
          </Box>
        )}
        {props.user.feedback > 0 && (
          <Box mt={1}>{props.user.feedback}% positive feedback</Box>
        )}
      </Box>

      <Box>
        <Avatar
          className={classes.large}
          alt={`${props.user.firstName} ${props.user.lastName}`}
          src={props.user.profilePicture}
        />
      </Box>
    </Box>
  );
};

export default Header;

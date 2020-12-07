import { AppBar, Avatar, Box, Grid, Toolbar, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { Link } from 'react-router-dom';

const Appbars = (props) => {
return (
    <AppBar
        style={{
          display: props.info ? "block" : "none",
          backgroundColor: "white",
          color: "#131921",
        }}
        position="fixed"
        className={props.classes.appBar}
      >
        <Grid container spacing={5}>
          <Grid item xs={5}>
            <Toolbar>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
              <Typography
                style={{
                  color: "#232F3E",
                  marginLeft: "10px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
                variant="h6"
                noWrap
              >
                {props.room.seller._id === props.currentUser.user.id ?  `${props.room.customer.firstName} ${props.room.customer.lastName}` : `${props.room.seller.firstName} ${props.room.seller.lastName}`}
              </Typography>
            </Toolbar>
            <Box fontSize={13} ml={2.5} color="gray" fontWeight={600}>
              <Box display="inline">{props.room.seller._id === props.currentUser.user.id ?  props.room.customer.department : props.room.seller.department} | </Box>
              <Box display="inline">{props.room.seller._id === props.currentUser.user.id ?  props.room.customer.faculty : props.room.seller.faculty} </Box>
              <Box>
                <Rating
                  name="rating"
                  title="rating"
                  defaultValue={props.room.seller._id === props.currentUser.user.id ?  props.room.customer.averageRating : props.room.seller.averageRating}
                  size="small"
                  precision={0.5}
                  readOnly
                />{" "}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Link to="#" className="link cursor">
              <Box className="hover" color="gray" pt={2}>
                This message relates to
              </Box>
              <img
                height="80"
                width="80"
                src={props.room.product.images[0]}
              />
              <Box className="hover" color="gray" mt={0.5}>
              {props.room.product.title.substring(0,50)}
              </Box>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Box
              onClick={props.handleInfo}
              fontSize={20}
              fontWeight={600}
              className="cursor link"
            >
              X
            </Box>
          </Grid>
        </Grid>
      </AppBar>
)
}

export default Appbars;
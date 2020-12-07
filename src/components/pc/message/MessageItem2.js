import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postCart } from "../../../store/actions/cart";
import Empty from '../../pc/profile/components/Empty'
import { fetchMessages, replyMessage } from "../../../store/actions/message";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import Hidden from "@material-ui/core/Hidden";

import List from "@material-ui/core/List";

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  
} from "@material-ui/core";

import Offer from "./Offer";
import Item from "./Item";
import TextFields from "./TextField";
import Appbars from "./Appbar";
import Moment from "react-moment";

const drawerWidth = 410;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "20px",
    height: "100vh",
  },
  small: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function MessageItem2(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState(true);
  const [done, setDone] = useState(false)
  const [sent, setSent] = useState(0)
  

  const handleInfo = () => {
    setInfo(!info);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const messagesEnd = React.createRef();
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    setSent(sent + 1)
  }

  const fetch = async () => {
    await props.fetchMessages(props.currentUser.user.id, props.room._id).then(() => {
      setDone(true)
    })
}

useEffect(() => {
  props.selectRoom(props.rooms[0])
}, [])

useEffect(() => {
  fetch()
  }, [props.room]);

  useEffect(() => {
    scrollToBottom();
  }, [done, sent])

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <h1 style={{ marginLeft: "10px", fontSize: "18px" }}>
        All Conversations
      </h1>
      <Divider />
      {props.rooms.length <= 0 && (
        <Box mt={2} height="80vh" display="flex" justifyContent="center" alignItems="center">
          <Box color="gray" fontWeight={600} fontSize={17}>

          Nothing Here!
          </Box>
        </Box>
      )}
      <List>
        {props.rooms.map((room, index) => (
          <Box
            opacity={room === props.room ? 0.6 : 1}
            onClick={() => props.selectRoom(room)}
            key={room._id}
            className="cursor link"
            mt={5}
            mx={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
            <Avatar className={classes.small} alt={room.seller._id === props.currentUser.user.id ? room.customer.firstName : room.seller.firstName} src={room.seller._id === props.currentUser.user.id ? room.customer.profilePicture : room.seller.profilePicture} />
            </Box>
            <Box ml={1.5}>
              <Box color="#232F3E" fontWeight={600} fontSize={17}>
              {
        room.seller._id === props.currentUser.user.id ? `${room.customer.firstName} ${room.customer.lastName}` : `${room.seller.firstName} ${room.seller.lastName}`
      }
              </Box>
              <Box
                my={0.5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                {room.lastMessage.substring(
                    0,
                    37
                  )}{" "}
                  ...
                </Box>
                <Box>
                <Box ml={1} fontSize={12.5} color="gray">
                <Moment format="D/M, h:mm a">{room.updatedAt}</Moment>
                </Box>
                {room.seller === props.currentUser.user.id && room.sellerToRead > 1 && (
                <Box
                mt={1.5}
                  color="white"
                  bgcolor="#ed3941"
                  ml={1}
                  height={20}
                  width={20}
                  textAlign="center"
                  fontSize={13}
                  fontWeight={600}
                  borderRadius={20}
                >
                  {room.seller === props.currentUser.user.id ? room.sellerToRead : room.customerToRead}
                </Box>
                )}
                </Box>
              </Box>
              <Box width={1}>
                <Divider />
              </Box>
            </Box>
          </Box>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      {props.rooms.length > 0 && (
        <Appbars room={props.room} classes={classes} info={info} handleInfo={handleInfo} />
      )}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        style={{
          height: "90%",
          width: "100%",
        }}
        className="chat-bg"
      >
        <div className={classes.toolbar} />
        <Box
          fontSize={17}
          style={{ width: "60%" }}
          fontWeight={600}
          className="cursor link"
          position="fixed"
          textAlign="right"
        >
          <InfoOutlinedIcon
            style={{ zIndex: 999 }}
            display={info ? "none" : "block"}
            fontSize="large"
            onClick={handleInfo}
          />
        </Box>
        <Box
          mt={5}
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
        >
          <Box mb={22} style={{ bottom: 0, width: "83%" }}>
            {props.rooms.length > 0 ? (
              <Item {...props} room={props.room} messages={props.messages} />
            ) : (
              <Empty text="Nothing Here!" />
            )
          }
            <Box height={150} ref={messagesEnd} />
          </Box>
        </Box>
        {props.rooms.length > 0 && (
          <Box
          width={1}
          style={{
            position: "fixed",
            bottom: "0",
            zIndex: 999,
          }}
        >
          <TextFields room={props.room} handleSend={handleSend} {...props} replyMessage={props.replyMessage} handleClickOpen={handleClickOpen} />
        </Box>
        )}
      </main>
      {props.rooms.length > 0 && (
        <Offer
        {...props}
        replyMessage={props.replyMessage}
        handleSend={handleSend}
        room={props.room}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

// MessageItem.propTypes = {
//   window: PropTypes.func,
// };


function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

export default connect(mapStateToProps, {
  fetchMessages,
  replyMessage,
  postCart,
})(MessageItem2);

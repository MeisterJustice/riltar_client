import { Box, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../profile/components/Header";
import MessageShowItem from "./MessageShowItem";
import Offer from "./Offer";
import TextFields from "./TextField";
import { postCart } from "../../../store/actions/cart";

import { fetchMessages, replyMessage } from "../../../store/actions/message";
import { connect } from "react-redux";


const MessageShow = (props) => {
  const messagesEnd = React.createRef();
  const [done, setDone] = useState(false)
  const [sent, setSent] = useState(0)
  const [open, setOpen] = React.useState(false);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    setSent(sent + 1)
  }

  const fetch = async () => {
    await props.fetchMessages(props.currentUser.user.id, props.room._id)
  await setDone(true)
}

useEffect(() => {
  fetch()
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [done, sent])
  return (
    <Box>
      <Header url="" photo={true} text="Favour Nwajoko" />
      <Container>
        {done && (
            <Box my={3}>
          <MessageShowItem postCart={props.postCart} {...props} messages={props.messages} />
        </Box>
        )}
        <Box height={100} ref={messagesEnd} />
        <Box width={1}>
          <Box
            width="96%"
            bgcolor="white"
            style={{
              position: "fixed",
              bottom: "0",
              zIndex: 999,
            }}
          >
            <TextFields handleSend={handleSend} {...props} replyMessage={props.replyMessage} handleClickOpen={handleClickOpen} />
          </Box>
        </Box>
        <Offer
        {...props}
        handleSend={handleSend}
          open={open}
          replyMessage={props.replyMessage}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </Container>
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

export default connect(mapStateToProps, {
  fetchMessages,
  replyMessage,
  postCart,
  
})(MessageShow);

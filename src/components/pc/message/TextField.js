import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SendIcon from "@material-ui/icons/Send";

const TextFields = (props) => {
  const [message, setMessage] = React.useState("");

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const recepient = props.currentUser.user.id === props.room.seller._id ? props.room.customer._id : props.room.seller._id

  const onMessageSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    props.replyMessage({message}, props.currentUser.user.id, props.room._id, recepient).then(() => {
      props.handleSend()
    })
  };
  return (
    <Box mx={2}>
      <Box width={1} mb={2.5}>
        <TextField
          value={message}
          placeholder="send message"
          name="message"
          onChange={onMessageChange}
          id="message"
          multiline
          style={{
            width: "55%",
            backgroundColor: "white",
          }}
          variant="outlined"
        />

        <SendIcon
          onClick={onMessageSubmit}
          role="button"
          fontSize="large"
          className="cursor"
          style={{
            marginLeft: "10px",
            color: "#ed3941",
            marginTop: "10px",
          }}
        />
        <Box mt={2} style={{ zIndex: 999 }}>
          <ImageOutlinedIcon className="cursor" />
          <Box ml={2} display="inline">
            <Button
              onClick={props.handleClickOpen}
              className="callToAction"
              size="small"
            >
              Make Offer
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TextFields;

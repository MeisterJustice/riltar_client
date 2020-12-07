import { Box, Grid, TextField } from "@material-ui/core";
import React from "react";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

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
    <form>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField
              value={message}
              name="message"
              onChange={onMessageChange}
              style={{
                border: "none",
              }}
              fullWidth
              multiline
              id="message"
              placeholder="type a message"
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              onClick={onMessageSubmit}
              mr={1}
              alignSelf="center"
              pt={0.9}
              fontSize={18}
              fontWeight={600}
              color="green"
              textAlign="right"
            >
              SEND
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={1}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Box display="inline">
                <ImageOutlinedIcon fontSize="large" />
              </Box>
              <Box
                color="#ed3941"
                fontSize={17}
                fontWeight={600}
                ml={2}
                display="inline"
                onClick={props.handleClickOpen}
              >
                MAKE OFFER
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default TextFields;

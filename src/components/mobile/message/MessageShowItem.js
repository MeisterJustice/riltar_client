import { Avatar, Box, Button, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import SimpleBackdrop from "../../general-components/Backdrop";
import Currency from "../../general-components/Currency";
import Empty from '../../pc/profile/components/Empty'



const MessageShowItem = (props) => {

  const [backdropOpen, setBackdropOpen] = useState(false)

const goTo = () => {
  props.history.push(`/cart`);
}

  async function submitCartAndCheckout() {
    await setBackdropOpen(true)
    await props
      .postCart({}, props.currentUser.user.id, props.room.product._id)
      .then(() => {
        setBackdropOpen(false)
      })
      .catch(() => {
        setBackdropOpen(false)
        return;
      });
  }

  const addToCart = () => {
      submitCartAndCheckout()
    goTo()
  };

  return (
    <Box>
      {props.messages.length <= 0 && (
        <Empty text="Nothing Here!" />
      )}
      {props.messages.map((message, index) => (
        <Box mt={4} key={message._id} display="flex" justifyContent="flex-start">
          <Box>
            <Avatar alt={message.sender.firstName} src={message.sender.profilePicture} />
          </Box>
          <Box ml={1.5}>
            <Box>
              <Box fontWeight={600} display="inline">
              {message.sender._id === props.currentUser.user.id ? "Me" : `${message.recepient.firstName} ${message.recepient.lastName}`}
              </Box>
              <Box ml={1.5} color="gray" display="inline">
              <Moment format="D/MM/YY, h:mm a">{message.createdAt}</Moment>
              </Box>
            </Box>
            {message.offer && (
              <Box p={1} boxShadow={5} mt={3}>
                <Box color="gray" fontWeight={600}>
                  {props.room.product.title.substring(0,40)}
                </Box>
                <Box my={1.5}>{message.message}</Box>
                <Divider />
                <Box display="flex" justifyContent="flex-start" mt={1.5} fontSize={20}>
                  <Box>Offer: </Box>
                  <Box ml={2}>
                    <Currency price={message.offer} />
                  </Box>
                </Box>
                {message.isAccepted && (
                  <Box fontWeight={600} mt={2} color="green">
                    ACCEPTED
                  </Box>
                )}
                <Box mt={2}>
                  <Button
                    disabled={
                      message.isAccepted
                    }
                    onClick={addToCart}
                    size="large"
                    fullWidth
                    variant="contained"
                    className="callToAction"
                  >
                    ADD TO CART & CHECKOUT
                  </Button>
                </Box>
              </Box>
            )}
            {!message.offer && (
              <Box mt={0.5}>
              {message.message}
            </Box>
            )}
            {index === 0 && (
              <Box p={1} boxShadow={5} mt={3}>
                <Link to={`/${props.room.product.title
                .split(" ")
                .join("-")
                .split("/")
                .join("-")}/${props.room.product._id}`} className="link">
                  <Box mb={1} color="gray">
                    This message relates to
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={5}>
                      <img
                        height="80"
                        width="90"
                        src={props.room.product.images[0]}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Box fontWeight={600} fontSize={14}>
                        {props.room.product.title.substring(0,80)}
                      </Box>
                    </Grid>
                  </Grid>
                </Link>
              </Box>
            )}
            
          </Box>
        </Box>
      ))}
        <SimpleBackdrop backdropOpen={backdropOpen} />

    </Box>
  );
};

export default MessageShowItem;

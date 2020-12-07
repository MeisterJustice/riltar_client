import { Avatar, Box, Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import Moment from "react-moment";
import SimpleBackdrop from "../../general-components/Backdrop";
import Currency from "../../general-components/Currency";

const Item = (props) => {

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
      {props.messages.map(
        (message, index) => (
          <Box key={message._id}>
            {message.sender._id === props.currentUser.user.id ? (
              <Box
                mt={5}
                ml={2}
                style={{ width: "100%" }}
                display="flex"
                justifyContent="flex-end"
              >
                <span
                  style={{
                    marginLeft: "30%",
                    marginRight: "5px",
                    backgroundColor: "#FCD4C5",
                    padding: "10px",
                  }}
                >
                  <Box textAlign="right" mr={1}>
                    <Box color="#232F3E" fontWeight={600} display="inline">
                      Me
                    </Box>
                    <Box color="#232F3E" ml={1} fontSize={12} display="inline">
                    <Moment format="D/MM/YY, h:mm a">{message.createdAt}</Moment>
                    </Box>
                  </Box>
                  <Box fontSize={14} color="#232F3E" textAlign="right" mt={1}>
                  {message.offer ? (
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
            ) : (
            <Box>{message.message}</Box>
            )
          }
                  </Box>
                </span>
                <Avatar alt={message.sender.firstName} src={message.sender.profilePicture} />
              </Box>
            ) : (
              <Box
                mt={5}
                ml={2}
                style={{ width: "100%" }}
                display="flex"
                justifyContent="flex-start"
              >
                <Avatar alt={message.sender.firstName} src={message.sender.profilePicture} />
                <span
                  style={{
                    marginRight: "30%",
                    marginLeft: "5px",
                    backgroundColor: "#cfe2fa",
                    padding: "10px",
                  }}
                >
                  <Box textAlign="left" mr={1}>
                    <Box color="#232F3E" mr={1} fontSize={12} display="inline">
                    <Moment format="D/MM/YY, h:mm a">{message.createdAt}</Moment>
                    </Box>
                    <Box color="#232F3E" fontWeight={600} display="inline">
                      {`${message.sender.firstName} ${message.sender.lastName}`}
                    </Box>
                  </Box>
                  <Box fontSize={14} color="#232F3E" textAlign="left" mt={1}>
                  {message.offer ? (
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
            ) : (
            <Box>{message.message}</Box>
            )
          }
                  </Box>
                </span>
              </Box>
            )}
          </Box>
        )
      )}
      <SimpleBackdrop backdropOpen={backdropOpen} />
    </Box>
  );
};

export default Item;

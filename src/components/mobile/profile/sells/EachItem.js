import React, { useState } from "react";
import { Box, Divider, TextField, Button } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Copy from "../../../pc/profile/components/Copy";
import Currency from "../../../general-components/Currency";
import Moment from "react-moment";
import Alerts from "../../../general-components/Alert";

const EachItem = (props) => {
  const { order, status } = props;
  const [pin, setPin] = React.useState("");

  const onChange = (e) => {
    setPin(e.target.value);
  };

  async function submit() {
    await props.openBackdrop();
    await props
      .confirmOrder({ pin: pin }, props.currentUser.user.id, order._id)
      .then(() => {
        props.openSnackbar();
        props.setHide(order._id);
        props.closeBackdrop();
      })
      .catch((e) => {
        props.setHide1(order._id);
        props.closeBackdrop();
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  return (
    <Box>
      <Box mt={5} boxShadow={2}>
        {props.hideId1 === order._id && (
          <Box align="center" mb={1.5}>
            {props.errors.message && (
              <Alerts message={props.errors.message} severity="error" />
            )}
          </Box>
        )}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon fontSize="large" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box>
              <Box
                my={1}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box>
                  {status === "delivered" && (
                    <CheckCircleOutlineOutlinedIcon
                      fontSize="small"
                      style={{ color: "green" }}
                    />
                  )}
                  {status === "cancelled" && (
                    <CancelIcon fontSize="small" style={{ color: "red" }} />
                  )}
                </Box>
                <Box fontSize={13} ml={1} fontWeight={600}>
                  <Currency price={order.totalPrice} />
                </Box>
                <Box fontSize={12} ml={1}>
                  {status === "open" && (
                    <Moment fromNow>{order.createdAt}</Moment>
                  )}
                  {status === "delivered" && (
                    <Moment format="MM/DD/YYYY hh:mm a">
                      {order.createdAt}
                    </Moment>
                  )}
                  {status === "cancelled" && (
                    <Moment format="MM/DD/YYYY hh:mm a">
                      {order.createdAt}
                    </Moment>
                  )}
                </Box>
              </Box>
              <Divider />
              <Box fontSize={14} mt={1}>
                {order.product.title.substring(0, 50)}...
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={1} fontSize={13}>
              {props.status === "open" && (
                <Box>
                  <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <Box fontSize={16} fontWeight={600}>
                      Confirm Delivery
                    </Box>
                    <Box>
                      <TextField
                        id="pin"
                        label="Buyer's Pin"
                        name="pin"
                        type="number"
                        fullWidth
                        onChange={onChange}
                      />
                    </Box>

                    <Box mt={0.5}>
                      <Button
                        type="submit"
                        size="small"
                        fullWidth
                        variant="contained"
                        className="callToAction"
                      >
                        Confirm
                      </Button>
                    </Box>
                  </form>
                </Box>
              )}
              <Box
                mt={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Paid</Box>
                {order.isPaidFor ? (
                  <Box style={{ color: "green" }}>yes</Box>
                ) : (
                  <Box style={{ color: "red" }}>no</Box>
                )}
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Customer</Box>
                <Box>
                  {order.user.firstName} {order.user.lastName}
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Phone Number</Box>
                <Box>
                  {order.user.phone}
                  <Copy text={order.user.phone} />
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Reference</Box>
                <Box>
                  {order.reference}
                  <Copy text={order.reference} />
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Address</Box>
                <Box>{order.user.location.country}</Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Payment Method</Box>
                <Box>Pay on delivery</Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Quantity</Box>
                <Box>{order.quantity}</Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Items Total</Box>
                <Box>
                  <Currency price={order.price} />
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Delivery Fee</Box>
                <Box>
                  <Currency price={0} />
                </Box>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box fontWeight={600}>Total</Box>
                <Box>
                  <Currency price={order.totalPrice} />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default EachItem;

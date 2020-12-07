import React from "react";
import { Box } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Copy from "../../../pc/profile/components/Copy";
import Empty from "../../../pc/profile/components/Empty";
import Currency from "../../../general-components/Currency";
import Moment from "react-moment";

const PayoutItem = (props) => {
  return (
    <Box>
      {props.payouts.length < 1 ? (
        <Empty text="You're yet to receive a payout" />
      ) : (
        props.payouts.map((payout, index) => (
          <Box mt={3} boxShadow={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <CheckCircleOutlineOutlinedIcon
                      fontSize="small"
                      style={{ color: "green" }}
                    />
                  </Box>
                  <Box fontSize={12.5} ml={1} fontWeight={600}>
                    <Currency price={payout.amount} />
                  </Box>
                  <Box fontSize={12} ml={1}>
                    <Moment format="dddd, MMMM Do, YYYY hh:mma">
                      {payout.createdAt}
                    </Moment>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box width={1} fontSize={13}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box fontWeight={600}>Product</Box>
                    <Box>{payout.product.title.substring(0, 35)}</Box>
                  </Box>
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box fontWeight={600}>Customer</Box>
                    <Box>
                      {payout.customer.firstName} ${payout.customer.lastName}
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
                      {payout.reference} <Copy text={payout.reference} />
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PayoutItem;

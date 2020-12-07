import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";

import Currency from "../../../general-components/Currency";

const ShoppingAnalytics = (props) => {
  const [spent, setSpent] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [monthSpending, setMonthSpending] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let totalEarning = 0;
    let complete = 0;
    let earningThisMonth = 0;
    for (var i = 0; i < props.orders.length; i++) {
      totalEarning += props.orders[i].totalPrice;
      if (props.orders[i].isDelivered === true) {
        complete += 1;
      }
      if (
        moment(props.orders[i].createdAt).format("MMMM") ===
        moment(Date.now()).format("MMMM")
      ) {
        earningThisMonth += props.orders[i].totalPrice;
      }
    }
    setSpent(totalEarning);
    setMonthSpending(earningThisMonth);
    setCompleted(complete);
    setDone(true);
  }, []);

  return (
    <Box mt={4} color="#57584E" p={2} bgcolor="white" boxShadow={1}>
      <Box pl={2} fontSize={18} fontWeight={600}>
        Shopping Analytics
      </Box>
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box px={2}>
          <Box fontSize={12}>Total Spending</Box>
          <Box mt={1} fontSize={18} fontWeight={600} align="center">
            {done ? (
              <Currency price={done ? spent : 0} />
            ) : (
              <Skeleton
                variant="text"
                width={60}
                height={40}
                animation="wave"
              />
            )}
          </Box>
        </Box>
        <Box px={2}>
          <Box fontSize={12}>Total Completed Orders</Box>
          <Box mt={1} fontSize={18} fontWeight={600} align="center">
            {done ? (
              completed
            ) : (
              <Skeleton
                variant="text"
                width={60}
                height={40}
                animation="wave"
              />
            )}
          </Box>
        </Box>
        <Box px={2}>
          <Box fontSize={12}>Spent in August</Box>
          <Box mt={1} fontSize={18} fontWeight={600} align="center">
            {done ? (
              <Currency price={monthSpending} />
            ) : (
              <Skeleton
                variant="text"
                width={60}
                height={40}
                animation="wave"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingAnalytics;

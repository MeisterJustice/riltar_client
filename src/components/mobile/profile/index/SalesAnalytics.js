import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Currency from "../../../general-components/Currency";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";

const SalesAnalytics = (props) => {
  const [earning, setEarning] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [monthEarning, setMonthEarning] = useState(0);
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
    setEarning(totalEarning);
    setMonthEarning(earningThisMonth);
    setCompleted(complete);
    setDone(true);
  }, []);
  return (
    <Box color="#57584E" p={2} bgcolor="white" boxShadow={2}>
      <Box pl={2} fontSize={18} fontWeight={600}>
        Sales Analytics
      </Box>
      <Box mt={4}>
        <Box
          px={2}
          mb={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box fontSize={12.5} textAlign="center">
            Total Earnings
          </Box>
          <Box fontSize={15} fontWeight={600} align="center">
            {done ? (
              <Currency price={earning} />
            ) : (
              <Skeleton
                variant="text"
                width={40}
                height={20}
                animation="wave"
              />
            )}
          </Box>
        </Box>

        <Box
          px={2}
          mb={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box fontSize={12.5} textAlign="center">
            Total Completed Orders
          </Box>
          <Box fontSize={15} fontWeight={600} align="center">
            {done ? (
              completed
            ) : (
              <Skeleton
                variant="text"
                width={40}
                height={20}
                animation="wave"
              />
            )}
          </Box>
        </Box>

        <Box
          px={2}
          mb={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box fontSize={12.5} textAlign="center">
            Earned in August
          </Box>
          <Box fontSize={15} fontWeight={600} align="center">
            {done ? (
              <Currency price={monthEarning} />
            ) : (
              <Skeleton
                variant="text"
                width={40}
                height={20}
                animation="wave"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SalesAnalytics;

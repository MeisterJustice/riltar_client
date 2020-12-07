import React, { lazy, Suspense, useEffect } from "react";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Skeleton from "@material-ui/lab/Skeleton";
const SellsTable = lazy(() => import("./SellsTable"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const SellsItem = (props) => {
  return (
    <Box py={2} bgcolor="white">
      <TabPanel value={props.value} index={0}>
        <Suspense
          fallback={
            <Box>
              <Skeleton variant="rect" height={300} />
            </Box>
          }
        >
          <SellsTable
            {...props}
            errors={props.errors}
            confirmOrder={props.confirmOrder}
            orders={props.orders}
            open={true}
          />
        </Suspense>
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <Suspense
          fallback={
            <Box>
              <Skeleton variant="rect" height={300} />
            </Box>
          }
        >
          <SellsTable orders={props.orders} delivered={true} />
        </Suspense>
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <Suspense
          fallback={
            <Box>
              <Skeleton variant="rect" height={300} />
            </Box>
          }
        >
          <SellsTable orders={props.orders} cancelled={true} />
        </Suspense>
      </TabPanel>
    </Box>
  );
};

export default SellsItem;

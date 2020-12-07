import React from "react";
import { Box, Grid, Divider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LeftGrid from "./LeftGrid";
import RightGrid from "./RightGrid";

import LazyLoad from "react-lazyload";
import Empty from "../components/Empty";
import Moment from "react-moment";

const OrderItem = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box>
      {props.orders.length < 1 ? (
        <Empty text="You're yet to place any order" />
      ) : (
        props.orders.map((order, index) => (
          <Box key={index} fontSize={14} mt={1} width={1}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1bh-content"
                style={{ height: "170px" }}
                id="panel1bh-header"
              >
                <Grid spacing={2} container>
                  <Grid item xs={2}>
                    <Box height="90%" flexGrow={1}>
                      <LazyLoad height="100%" once>
                        <img
                          alt={order.product.title}
                          title={order.product.title}
                          width="100%"
                          height="50%"
                          className="image"
                          src={order.product.images[0]}
                        />
                      </LazyLoad>
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>{order.product.title.substring(0, 55)}...</Box>
                    <Box color="gray" mt={1}>
                      reference: {order.reference}
                    </Box>
                    <Box mt={1} mb={1.5}>
                      <Box
                        bgcolor="#0077be"
                        color="white"
                        p={0.3}
                        width={65}
                        display="inline"
                      >
                        Ordered
                      </Box>
                      <Box display="inline" ml={1}>
                        <Moment format="MMMM Do, YYYY">
                          {order.createdAt}
                        </Moment>
                      </Box>
                    </Box>
                    <Divider />
                    <Box mt={2}>
                      <Box
                        bgcolor="green"
                        color="white"
                        p={0.3}
                        width={65}
                        display="inline"
                      >
                        Delivered
                      </Box>
                      <Box display="inline" ml={1}>
                        {!order.dateDelivered ? (
                          "In Progress"
                        ) : (
                          <Moment format="MMMM Do, YYYY">
                            {order.dateDelivered}
                          </Moment>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid xs={6} item>
                    <LeftGrid order={order} />
                  </Grid>
                  <Grid xs={6} item>
                    <RightGrid order={order} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))
      )}
    </Box>
  );
};

export default OrderItem;

import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { Divider, Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Moment from "react-moment";

function createData(title, result) {
  return { title, result };
}

const TabsComponent = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  let rows = [];
  props.product.metaData.map((item, index) => {
    let data = createData(
      Object.keys(props.product.metaData[index]),
      Object.values(props.product.metaData[index])
    );
    rows.push(data);
  });
  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(tabIndex) => setTabIndex(tabIndex)}
    >
      <TabList>
        <Tab style={{ fontWeight: "500" }}>Product Description</Tab>
        <Tab style={{ fontWeight: "500" }}>Product Specs</Tab>
        <Tab style={{ fontWeight: "500" }}>
          Customer Reviews ({props.product.ratings.length})
        </Tab>
      </TabList>
      <TabPanel>
        <Box
          py={3}
          color="#282828"
          mt={3}
          className="productBackground"
          boxShadow={2}
          width={1}
        >
          <Box ml={2} mr={7} mt={2}>
            {props.product.description}
          </Box>
        </Box>
      </TabPanel>
      <TabPanel>
        <Box
          py={3}
          color="#282828"
          mt={3}
          className="productBackground"
          boxShadow={2}
          width={1}
        >
          <Box ml={2} mr={35} mt={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ background: "#282828" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Title</TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Result
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel id="reviews">
        <Box
          py={3}
          color="#282828"
          mt={3}
          className="productBackground"
          boxShadow={2}
          width={1}
        >
          <Box ml={2} mr={7}>
            {props.product.ratings.length > 0 && (
              <Box fontWeight="bold" textAlign="right">
                <Link style={{ color: "#B12704" }} className="link" to="#">
                  SEE ALL {">>"}
                </Link>
              </Box>
            )}
          </Box>
          <Box mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {props.product.ratings.map((rating, index) => (
                  <Box key={rating._id} mt={3} ml={5}>
                    <Box>
                      <Rating
                        name="rating"
                        title="rating"
                        defaultValue={rating.rating}
                        size="medium"
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                    <Box fontWeight={600} mt={1}>
                      {rating.title}
                    </Box>
                    <Box mt={1}>{rating.review}</Box>
                    <Box my={1} fontSize={14} fontWeight="fontWeightLight">
                      By {rating.user.firstName} {rating.user.lastName} on
                      <Moment format="MMMM Do, YYYY">{rating.createdAt}</Moment>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        </Box>
      </TabPanel>
    </Tabs>
  );
};

export default TabsComponent;

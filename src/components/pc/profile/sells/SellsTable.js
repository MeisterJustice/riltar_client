import React, { useState, useEffect, lazy, Suspense } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const Row = lazy(() => import("./TableCollapse"));

const SellsTable = (props) => {
  const [orders, setOrders] = useState([]);
  const [done, setDone] = useState(false);
  async function fetchData() {
    let openOrders = [];
    for (var i = 0; i < props.orders.length; i++) {
      if (props.orders[i].isDelivered === false) {
        openOrders.push(props.orders[i]);
      }
    }
    await setOrders(openOrders);
    await setDone(true);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sells table">
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 150 }} />
            <TableCell style={{ minWidth: 220, fontWeight: "600" }}>
              Product
            </TableCell>
            <TableCell
              style={{ minWidth: 140, fontWeight: "600" }}
              align="right"
            >
              Amount
            </TableCell>
            <TableCell style={{ minWidth: 100 }} align="right">
              Paid
            </TableCell>
            <TableCell
              style={{ minWidth: 180, fontWeight: "600" }}
              align="right"
            >
              Buyer
            </TableCell>
            <TableCell
              style={{ minWidth: 140, fontWeight: "600" }}
              align="right"
            >
              Phone Number
            </TableCell>
            <TableCell
              style={{ minWidth: 230, fontWeight: "600" }}
              align="right"
            >
              Address
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((data, index) => (
            <Suspense key={index}>
              <Row row={data} />
            </Suspense>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SellsTable;

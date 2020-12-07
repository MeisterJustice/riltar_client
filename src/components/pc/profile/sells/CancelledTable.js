import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import { Box } from "@material-ui/core";
import Moment from "react-moment";
import Currency from "../../../general-components/Currency";
import Copy from "../components/Copy";

const columns = [
  { id: "good", label: "", minWidth: 71 },
  {
    id: "date",
    label: "Cancelled On",
    minWidth: 180,
  },

  { id: "product", label: "Product", minWidth: 200 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "buyer",
    label: "Buyer",
    minWidth: 170,
  },
  {
    id: "reference",
    label: "Reference",
    minWidth: 100,
  },
];

function createData(good, product, amount, buyer, reference, date) {
  return { good, product, amount, buyer, reference, date };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const CancelledTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  async function fetchData() {
    let openOrders = [];
    for (var i = 0; i < props.orders.length; i++) {
      if (props.orders[i].isCancelled === true) {
        openOrders.push(props.orders[i]);
      }
    }
    await setOrders(openOrders);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const rows = [];
  orders.map((data) => {
    let cancelledOrder = createData(
      <CancelIcon fontSize="small" style={{ color: "red" }} />,
      data.product.title.substring(0, 45) + "...",
      <Currency price={data.totalPrice} />,
      data.user.firstName + " " + data.user.lastName,
      data.reference,
      <Moment format="MM/DD/YYYY hh:mm a">{data.createdAt}</Moment>
    );
    rows.push(cancelledOrder);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="payouts">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          style={{
                            fontSize: 13,
                            fontWeight:
                              column.format && typeof value === "number"
                                ? 600
                                : 500,
                          }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            <Box>&#8358; {column.format(value)}</Box>
                          ) : column.id === "reference" ? (
                            <Box>
                              {value} <Copy text={value} />
                            </Box>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CancelledTable;

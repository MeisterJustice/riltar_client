import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { Box } from "@material-ui/core";
import Copy from "../components/Copy";
import Currency from "../../../general-components/Currency";
import Moment from "react-moment";
import Empty from "../components/Empty";

const columns = [
  { id: "good", label: "", minWidth: 71 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Paid On",
    minWidth: 250,
  },
  { id: "product", label: "Product", minWidth: 200 },
  {
    id: "customer",
    label: "Customer",
    minWidth: 190,
  },
  {
    id: "reference",
    label: "Reference",
    minWidth: 200,
  },
];

function createData(good, amount, date, product, customer, reference) {
  return { good, amount, date, product, customer, reference };
}

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

const TableData = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let rows = [];
  const payouts = props.payouts.map((payout, index) => {
    let singlePayout = createData(
      <CheckCircleOutlineOutlinedIcon
        fontSize="small"
        style={{ color: "green" }}
      />,
      <Currency price={payout.amount} />,
      <Moment format="dddd, MMMM Do, YYYY hh:mma">{payout.createdAt}</Moment>,
      payout.product.title.substring(0, 55),
      `${payout.customer.firstName} ${payout.customer.lastName}`,
      payout.reference
    );
    rows.push(singlePayout);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {props.payouts.length < 1 ? (
        <Empty text="You're yet to receive a payout" />
      ) : (
        <Box>
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
              <TableBody style={{ backgroundColor: "white" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
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
                              ) : column.label === "Reference" ? (
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
        </Box>
      )}
    </Box>
  );
};

export default TableData;

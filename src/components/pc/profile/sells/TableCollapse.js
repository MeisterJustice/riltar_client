import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Copy from "../components/Copy";
import { Grid } from "@material-ui/core";
import LeftGrid from "../order/LeftGrid";
import RightGrid from "../order/RightGrid";
import Currency from "../../../general-components/Currency";
import Moment from "react-moment";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <Box
            className="cursor"
            onClick={() => setOpen(!open)}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Moment fromNow>{row.createdAt}</Moment>
            <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </TableCell>
        <TableCell style={{ fontSize: 13 }} scope="row">
          {row.product.title.substring(0, 55)}...
        </TableCell>
        <TableCell style={{ fontSize: 13 }} align="right">
          <Currency price={row.totalPrice} />
        </TableCell>
        <TableCell style={{ fontSize: 13 }} align="right">
          {row.isPaidFor ? (
            <Box fontWeight={600} style={{ color: "green" }}>
              yes
            </Box>
          ) : (
            <Box fontWeight={600} style={{ color: "red" }}>
              no
            </Box>
          )}
        </TableCell>
        <TableCell style={{ fontSize: 13 }} align="right">
          {row.user.firstName} {row.user.lastName}
        </TableCell>
        <TableCell style={{ fontSize: 13 }} align="right">
          {row.user.phone}
          <Copy text={row.user.phone} />
        </TableCell>
        <TableCell style={{ fontSize: 13 }} align="right">
          {row.user.location.country}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={2}>
                <Grid xs={6} item>
                  <LeftGrid row={row} />
                </Grid>
                <Grid xs={6} item>
                  <RightGrid row={row} />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;

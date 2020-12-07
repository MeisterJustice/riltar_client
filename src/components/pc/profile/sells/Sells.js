import React, { useEffect, lazy, Suspense } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import Header from "../components/Header";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Menu from "../components/Menu";
import { fetchSells } from "../../../../store/actions/orders";
import Skeleton from "@material-ui/lab/Skeleton";
const SellsTable = lazy(() => import("./SellsTable"));
const DeliveredTable = lazy(() => import("./DeliveredTable"));
const CancelledTable = lazy(() => import("./CancelledTable"));

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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SellsPc = (props) => {
  const [value, setValue] = React.useState(0);
  const [done, setDone] = React.useState(false);
  async function fetch() {
    await props.fetchSells(props.currentUser.user.id);
    setDone(true);
  }
  useEffect(() => {
    fetch();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="bg" style={{ position: "absolute", width: "100%" }}>
      <Box pb={5} mt={2}>
        <Container>
          <Header />
          <Grid spacing={5} container>
            <Grid item xs={3}>
              <Menu {...props} />
            </Grid>
            <Grid item xs={9}>
              <Box width={1}>
                <Box fontSize={23} fontWeight={600} mb={2}>
                  Your Sales
                </Box>
                <AppBar
                  style={{ backgroundColor: "#092b4a" }}
                  position="static"
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="sales menu"
                    centered
                  >
                    <Tab label="Open Orders (6)" {...a11yProps(0)} />
                    <Tab label="Delivered Orders (3)" {...a11yProps(1)} />
                    <Tab label="Cancelled Orders (1)" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <Box mt={3} py={2} bgcolor="white">
                  <TabPanel value={value} index={0}>
                    {done && (
                      <Suspense
                        fallback={
                          <Box>
                            <Skeleton variant="rect" height={300} />
                          </Box>
                        }
                      >
                        <SellsTable orders={props.sells} />
                      </Suspense>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {done && (
                      <Suspense
                        fallback={
                          <Box>
                            <Skeleton variant="rect" height={300} />
                          </Box>
                        }
                      >
                        <DeliveredTable orders={props.sells} />
                      </Suspense>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {done && (
                      <Suspense
                        fallback={
                          <Box>
                            <Skeleton variant="rect" height={300} />
                          </Box>
                        }
                      >
                        <CancelledTable orders={props.sells} />
                      </Suspense>
                    )}
                    {!done && (
                      <Box
                        height="90vh"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CircularProgress color="gray" />
                      </Box>
                    )}
                  </TabPanel>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
function mapStateToProps(state) {
  return {
    sells: state.sells,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, {
  fetchSells,
})(SellsPc);

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import moment from "moment";

const ViewsChart = (props) => {
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  });
  let jan = 0;
  let feb = 0;
  let mar = 0;
  let apr = 0;
  let may = 0;
  let jun = 0;
  let jul = 0;
  let aug = 0;
  let sep = 0;
  let oct = 0;
  let nov = 0;
  let dec = 0;

  let datasets = [
    {
      label: "Views",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [],
    },
  ];
  const getData = () => {
    for (var i = 0; i < props.views.length; i++) {
      console.log(
        "the date: ",
        moment(props.views[i].createdAt).format("MMMM")
      );
      if (moment(props.views[i].createdAt).format("MMMM") === "January") {
        jan += 1;
      } else if (
        moment(props.views[i].createdAt).format("MMMM") === "Febuary"
      ) {
        feb += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "March") {
        mar += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "April") {
        apr += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "May") {
        may += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "June") {
        jun += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "July") {
        jul += 1;
      } else if (moment(props.views[i].createdAt).format("MMMM") === "August") {
        aug += 1;
      } else if (
        moment(props.views[i].createdAt).format("MMMM") === "September"
      ) {
        sep += 1;
      } else if (
        moment(props.views[i].createdAt).format("MMMM") === "October"
      ) {
        oct += 1;
      } else if (
        moment(props.views[i].createdAt).format("MMMM") === "November"
      ) {
        nov += 1;
      } else if (
        moment(props.views[i].createdAt).format("MMMM") === "December"
      ) {
        dec += 1;
      }
    }
    datasets[0].data.push(
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec
    );
  };
  async function fetchData() {
    await getData();
    await setData({ ...data, datasets: datasets });
    setDone(true);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box mt={4} bgcolor="white" boxShadow={2}>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: "How Your Products Were Viewed Per Month",
            fontSize: 14,
          },
          legend: {
            display: false,
            position: "right",
          },
        }}
      />
    </Box>
  );
};

export default ViewsChart;

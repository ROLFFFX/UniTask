import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from "victory";
import { Grid, Typography, Box } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";

const cartesianInterpolations = [
  "basis",
  "bundle",
  "cardinal",
  "catmullRom",
  "linear",
  "monotoneX",
  "monotoneY",
  "natural",
  "step",
  "stepAfter",
  "stepBefore",
];

const polarInterpolations = ["basis", "cardinal", "catmullRom", "linear"];

const InterpolationSelect = ({ currentValue, values, onChange }) => (
  <select onChange={onChange} value={currentValue} style={{ width: 75 }}>
    {values.map((value) => (
      <option value={value} key={value}>
        {value}
      </option>
    ))}
  </select>
);

const PersonalChart = ({ processedPersonalData }) => {
  console.log(processedPersonalData);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [interpolation, setInterpolation] = useState("linear");
  const [polar, setPolar] = useState(false);

  const calculateSize = () => {
    const width = (window.innerWidth - 200) * (8 / 12);
    const height = (window.innerHeight - 64) * 0.45;
    setChartSize({ width, height });
  };

  useEffect(() => {
    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  //format data to [x, y] from [date, personalPoints]
  const mapDataToChartFormat = (data) => {
    return data.map((item, index) => {
      return { x: index, y: item.personalPoints, date: item.key };
    });
  };

  const chartData = mapDataToChartFormat(processedPersonalData);

  // control displayed tick labels. cut off 2/3 of them and make them evenly distributed
  const getTickValues = () => {
    return chartData
      .filter((_, index) => index % 3 === 0)
      .map((point) => point.x); // Select every third label
  };
  // map them to their corresponding position by index
  const formatTick = (tick) => {
    const dataPoint = chartData.find((point) => point.x === tick);
    return dataPoint
      ? dataPoint.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "";
  };

  return (
    <React.Fragment>
      <Box position="relative">
        <Grid container>
          {/* Grid for header */}
          <Grid item xs={6}>
            <div
              style={{
                position: "absolute",
                left: "28%",
                top: "15%",
                transform: "translate(-50%, -50%)",
                width: "300px", // Diameter of the circle
                height: "40px", // Diameter of the circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
              }}
            >
              <Typography
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#212529",
                }}
              >
                Personal Task Progression
              </Typography>
              <AdsClickIcon sx={{ marginLeft: "15px" }} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                position: "absolute",
                left: "28%",
                top: "6%",
                transform: "translate(-50%, -50%)",
                width: "300px", // Diameter of the circle
                height: "40px", // Diameter of the circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                zIndex: 1000,
              }}
            >
              <InterpolationSelect
                currentValue={interpolation}
                values={polar ? polarInterpolations : cartesianInterpolations}
                onChange={(event) => setInterpolation(event.target.value)}
              />
              {/* The commented part below allows to change to polar view, which i have no clue what it does */}
              {/* <input
                type="checkbox"
                id="polar"
                checked={polar}
                onChange={(event) => {
                  setPolar(event.target.checked);
                  setInterpolation("linear");
                }}
                style={{ marginLeft: 25, marginRight: 5 }}
              /> */}
              {/* <label htmlFor="polar">polar</label> */}
            </div>
          </Grid>
          {/* Grid for actual graph */}
          <Grid item xs={12}>
            <VictoryChart
              polar={polar}
              height={chartSize.height * 0.8}
              width={chartSize.width * 0.9}
            >
              <VictoryAxis
                tickValues={getTickValues()}
                tickFormat={formatTick}
              />
              <VictoryAxis dependentAxis />
              <VictoryLine
                interpolation={interpolation}
                data={chartData} // Use the processed chart data here
                style={{ data: { stroke: "#c43a31" } }}
              />
              <VictoryScatter
                data={chartData} // Use the processed chart data here
                size={5}
                style={{ data: { fill: "#c43a31" } }}
              />
            </VictoryChart>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default PersonalChart;

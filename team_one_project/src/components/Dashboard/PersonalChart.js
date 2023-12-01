import AdsClickIcon from "@mui/icons-material/AdsClick";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from "victory";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

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

// renders interpolation options
const InterpolationSelect = ({ currentValue, values, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
      }}
    >
      {values.map((value) => (
        <Link
          key={value}
          component="button"
          color={currentValue === value ? "#495057" : "#212529"}
          onClick={() => onChange(value)}
          style={{
            cursor: "pointer",
            textDecoration: currentValue === value ? "underline" : "none", // underline selected item
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            marginTop: "10px",
          }}
          href="#separators"
        >
          {value}
        </Link>
      ))}
    </div>
  );
};

// processedData = [
//   {
//     key: "Fri Dec 01 2023 00:08:55 GMT-0500 (Eastern Standard Time)",
//     b: 100,
//   },
//   {
//     key: "Fri Nov 30 2023 00:08:55 GMT-0500 (Eastern Standard Time)",
//     b: 100,
//   },
// ];
const PersonalChart = ({ processedPersonalData }) => {
  const [personalTotal, setPersonalTotal] = useState(0);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [interpolation, setInterpolation] = useState("linear");
  const [polar, setPolar] = useState(false);
  const [shouldRenderChart, setshouldRenderChart] = useState(true);

  useEffect(() => {
    let uniqueBValues = new Set(processedPersonalData.map((data) => data.b));
    setshouldRenderChart(uniqueBValues.size > 1);
  }, [processedPersonalData]);

  const calculateSize = () => {
    const width = (window.innerWidth - 200) * (8 / 12);
    const height = (window.innerHeight - 64) * 0.45;
    setChartSize({ width, height });
  };

  const handleInterpolationChange = (value) => {
    setInterpolation(value);
  };

  useEffect(() => {
    {
      let total = 0;
      processedPersonalData.map((data) => {
        total += data.b;
      });
      setPersonalTotal(total);
    }
  }, [processedPersonalData]);

  useEffect(() => {
    calculateSize();
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, []);

  // Format data for the chart: converting 'key' to a readable date format for the X-axis
  const mapDataToChartFormat = (data) => {
    return data.map((item, index) => {
      const formattedDate = new Date(item.key).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return { x: formattedDate, y: item.b };
    });
  };

  const chartData = mapDataToChartFormat(processedPersonalData);

  // Get unique X-axis tick values
  const getUniqueTickValues = () => {
    return [...new Set(chartData.map((point) => point.x))];
  };

  return shouldRenderChart ? (
    <Box position="relative">
      <Grid container>
        {/* Grid for header */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "20%",
            transform: "translate(-50%, -50%)",
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
            border={1}
            padding={1}
            borderRadius={2}
          >
            Personal Task Progression
          </Typography>
          <AdsClickIcon sx={{ marginLeft: "15px" }} />
        </div>
        <Tooltip
          title={
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
            >
              <strong>Personal Chart Guide:</strong>
              <br />
              <br />- <strong>Data Insights:</strong> This graph represents the
              progression of cumulative tasks achieved over time by you.
              <br />
              <br />- <strong>Interpolations:</strong> Choose the interpolation
              menu above to customize your view. We have 11 options to offer!
            </Typography>
          }
          arrow
          placement="top"
          TransitionProps={{ timeout: 600 }}
        >
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
              zIndex: 1000,
            }}
          ></div>
        </Tooltip>
        <Grid item xs={12}>
          <div
            style={{
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
              onChange={setInterpolation}
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
            {processedPersonalData.length > 1 && (
              <VictoryAxis
                tickValues={getUniqueTickValues()}
                style={{
                  axis: { stroke: "#756f6a" },
                  axisLabel: { fontSize: 12 },
                  ticks: { stroke: "grey", size: 5 },
                  tickLabels: { fontSize: 9 },
                }}
                // optional: customize tickLabelComponent for more formatting
              />
            )}

            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 12 },
                ticks: { stroke: "grey", size: 5 },
                tickLabels: { fontSize: 9 },
              }}
            />

            <VictoryLine
              interpolation={interpolation}
              data={chartData}
              style={{ data: { stroke: "#c43a31" } }}
            />
            <VictoryScatter
              data={chartData}
              size={5}
              style={{ data: { fill: "#c43a31" } }}
            />
          </VictoryChart>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc((100vh - 64px) * 0.45)",
      }}
    >
      <EmojiFoodBeverageIcon color="action" />
      <Typography
        style={{ fontFamily: "Inter, sans-serif", marginLeft: "10px" }}
      >
        You haven't done any tasks yet...
      </Typography>
    </Box>
  );
};

export default PersonalChart;

import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryArea,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLine,
  VictoryTooltip,
} from "victory";
import AdsClickIcon from "@mui/icons-material/AdsClick";

function calculateTrendLineData(processedData) {
  if (!processedData || processedData.length === 0) return [];
  const start = processedData[0];
  const end = processedData[processedData.length - 1];
  return [
    { key: start.key, b: start.b },
    { key: end.key, b: end.b },
  ];
}

function formatDateToMonthDay(dateStr) {
  const months = [
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
  ];
  const date = new Date(dateStr);

  const month = months[date.getUTCMonth()]; // getUTCMonth() returns a zero-based index of the month
  const day = date.getUTCDate(); // getUTCDate() returns the day of the month

  return `${month} ${day}`;
}

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
export default function BurndownChart({ processedData }) {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [trendLineData, setTrendLineData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    setTrendLineData(calculateTrendLineData(processedData));
  }, [processedData]);

  useEffect(() => {
    function handleResize() {
      const width = (window.innerWidth - 200) * (7 / 12);
      const height = (window.innerHeight - 64) * 0.4;
      setChartSize({ width, height });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [zoomDomain, setZoomDomain] = useState({}); //default brush domain

  const handleZoom = (domain) => {
    setZoomDomain(domain);
  };

  useEffect(() => {
    const aggregateData = {};

    processedData.forEach((data) => {
      const formattedKey = formatDateToMonthDay(data.key);

      if (!aggregateData[formattedKey]) {
        aggregateData[formattedKey] = { key: formattedKey, b: 0 };
      }
      aggregateData[formattedKey].b += data.b;
    });

    setFormattedData(Object.values(aggregateData));
    setTrendLineData(calculateTrendLineData(Object.values(aggregateData)));
  }, [processedData]);

  const shouldRenderYAxis = formattedData.length > 1;

  return formattedData ? (
    <Box style={{ position: "relative" }}>
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
          border={1}
          padding={1}
          borderRadius={2}
        >
          Group's Total Task Progression
        </Typography>
        <AdsClickIcon sx={{ marginLeft: "15px" }} />
      </div>
      <Tooltip
        title={
          <Typography
            style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
          >
            <strong>Interactive Graph Guide:</strong>
            <br />
            <br />- <strong>Data Insights:</strong> This graph represents the
            progression of cumulative tasks achieved over time. Adjust the view
            to focus on specific intervals and analyze your team's performance
            against planned milestones.
            <br />
            <br />- <strong>Zoom:</strong> Click and drag horizontally on the
            main chart area to zoom in on a specific time period.
            <br />
            <br />- <strong>Brush:</strong> Use the smaller chart below to
            adjust the visible window of the main chart.
            <br />
            <br />- <strong>Trend Line:</strong> The dashed line indicates the
            expected trend based on initial projections.
          </Typography>
        }
        arrow
        placement="top"
        TransitionProps={{ timeout: 600 }}
      >
        {/* a shadow tooltip that defines the place of tool tip with higher zindex. */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "15%",
            transform: "translate(-50%, -50%)",
            width: "300px", // Diameter of the circle
            height: "40px", // Diameter of the circle
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: 1,
            zIndex: 1000,
          }}
        ></div>
      </Tooltip>
      <VictoryChart
        width={chartSize.width}
        height={chartSize.height * (4 / 5)}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => x}
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 12 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 9 },
          }}
        />
        {shouldRenderYAxis && (
          <VictoryAxis
            dependentAxis
            tickFormat={(b) => `${b}`}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 12 },
              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 9 },
            }}
          />
        )}
        <VictoryArea
          standalone={true}
          interpolation="natural"
          style={{ data: { fill: "#778da9" } }}
          data={formattedData}
          x="key"
          y="b"
        />

        <VictoryLine
          data={trendLineData}
          x="key"
          y="b"
          style={{
            data: { stroke: "#1b263b", strokeWidth: 1, strokeDasharray: "3,3" },
          }}
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={chartSize.width}
        height={chartSize.height * (1 / 5)}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={handleZoom}
          />
        }
      >
        <VictoryAxis tickFormat={(x) => " "} />
        <VictoryArea
          interpolation="natural"
          style={{ data: { fill: "#778da9" } }}
          data={formattedData}
          x="key"
          y="b"
        />
      </VictoryChart>
    </Box>
  ) : (
    <div>Loading...</div>
  );
}

/**
 * @fileoverview This file defines the BurndownChart component, which is used to render
 * a burndown chart using the Victory charting library. It visualizes group task progression
 * over time and allows interactive exploration of the data. It renders at the bottom left
 * of dashboard - data visualization.
 */

import AdsClickIcon from "@mui/icons-material/AdsClick";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";

/**
 * A Helper Function that calculates a trend line based on provided data.
 *
 * @param {Array<Object>} processedData - Array of objects representing the task points.
 * @returns {Array<Object>} Array containing start and end points for the trend line.
 */
function calculateTrendLineData(processedData) {
  if (!processedData || processedData.length === 0) return [];
  const start = processedData[0];
  const end = processedData[processedData.length - 1];
  return [
    { key: start.key, b: start.b },
    { key: end.key, b: end.b },
  ];
}

/**
 * A Helper Function that formats a date string into a 'Month Day' format.
 *
 * @param {string} dateStr - The date string to format.
 * @returns {string} The formatted date string.
 */
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

/**
 * BurndownChart - A functional component for rendering a burndown chart.
 *
 * This component takes processed data as a prop and renders a burndown chart that shows
 * the progression of tasks over time. The chart is interactive, allowing users to zoom
 * and brush over the data. It also dynamically adjusts to the window size.
 *
 * Props:
 * @param {Array<Object>} processedData - The data used to render the chart. Each object
 *                                        should contain a date (key) and a value (b).
 *
 * State:
 * @state @type {Object} chartSize - The size of the chart, with width and height properties.
 * @state @type {Array<Object>} trendLineData - Data used to render the trend line on the chart.
 * @state @type {Array<Object>} formattedData - Processed data formatted for chart rendering.
 * @state @type {Object} zoomDomain - Domain for the VictoryZoomContainer component.
 *
 * useEffect:
 * - Sets the trend line data based on processedData.
 * - Adds and removes a resize event listener to update the chart size.
 * - Aggregates data by date and updates formattedData and trendLineData.
 *
 * @returns {React.ReactElement} A React element representing the burndown chart.
 */

/* Sample Prop
 * processedData = [
 *   {
 *     key: "Fri Dec 01 2023 00:08:55 GMT-0500 (Eastern Standard Time)",
 *     b: 100,
 *   },
 *   {
 *     key: "Fri Nov 30 2023 00:08:55 GMT-0500 (Eastern Standard Time)",
 *     b: 100,
 *   },
 * ];
 */
export default function BurndownChart({ processedData }) {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [trendLineData, setTrendLineData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    setTrendLineData(calculateTrendLineData(processedData));
  }, [processedData]);

  useEffect(() => {
    function handleResize() {
      const width = (window.innerWidth - 200) * (7 / 12); // 200 represents 200px for left side bar. 7/12 is specifically customized to match MUI Grid.
      const height = (window.innerHeight - 64) * 0.4; // similarly, 64 represesnts 64px for top nav bar.
      setChartSize({ width, height });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [zoomDomain, setZoomDomain] = useState({}); //default brush domain is set to empty, so it initially renders entire time interval.

  const handleZoom = (domain) => {
    setZoomDomain(domain);
  };

  // In this modified version of aggregating data, it will process tasks done in same day correctly. Instead of
  // summing them altogether, it will take the latest task done that day and take that b value.
  useEffect(() => {
    const aggregateData = {};
    processedData.forEach((data) => {
      const formattedKey = formatDateToMonthDay(data.key);
      aggregateData[formattedKey] = { key: formattedKey, b: data.b };
    });
    setFormattedData(Object.values(aggregateData));
    setTrendLineData(calculateTrendLineData(Object.values(aggregateData)));
  }, [processedData]);

  const shouldRenderYAxis = formattedData.length > 1;

  return formattedData ? (
    // Box for entire section
    <Box style={{ position: "relative" }}>
      {/* Box for chart title. This Box is of lower zindex so that it will be hidden if chart content overlaps it. */}
      <Box
        style={{
          position: "absolute",
          left: "28%",
          top: "15%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "40px",
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
      </Box>
      {/* Tooltip for Chart title. It includes user guide. */}
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
        {/* A shadow div that defines the place of tool tip with higher zindex. Its position completely overlaps the title Box, 
        but it has no content and higher zindex so that when VictoryArea overlaps it, the tooltip still responds to user. */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "15%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "40px",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: 1,
            zIndex: 1000,
          }}
        ></div>
      </Tooltip>
      {/* The upper victory chart. Represents actual data. */}
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
          // data={processedData}
          data={formattedData}
          x="key"
          y="b"
        />
        {/* VictoryLine for trend line */}
        <VictoryLine
          data={trendLineData}
          x="key"
          y="b"
          style={{
            data: { stroke: "#1b263b", strokeWidth: 1, strokeDasharray: "3,3" },
          }}
        />
      </VictoryChart>
      {/* The lower VictoryChart, which represents the brush of user and shows user selected intervals. */}
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
    // Conditional rendering. Loading state when processedData is not yet received.
    <div>Loading...</div>
  );
}

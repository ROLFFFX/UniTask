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

function calculateTrendLineData(processedData) {
  // Example: Calculate a simple linear trend from start to end
  if (!processedData || processedData.length === 0) return [];

  const start = processedData[0];
  const end = processedData[processedData.length - 1];
  return [
    { key: start.key, b: start.b },
    { key: end.key, b: end.b },
  ];
}

export default function BurndownChart({ processedData }) {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [trendLineData, setTrendLineData] = useState([]);

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

  // console.log(processedData[0]);
  // console.log(processedData[processedData.length - 1].key);

  const [zoomDomain, setZoomDomain] = useState({}); //default brush domain

  const handleZoom = (domain) => {
    setZoomDomain(domain);
  };

  return processedData ? (
    <Box style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          width: "130px", // Diameter of the circle
          height: "130px", // Diameter of the circle
          backgroundColor: "#bc4749",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Tooltip
        title={
          <Typography
            style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
          >
            <strong>Interactive Graph Guide:</strong>
            <br />- <strong>Zoom:</strong>Click and drag horizontally on the
            main chart area to zoom in on a specific time period.
            <br />- <strong>Brush:</strong> Use the smaller chart below to
            adjust the visible window of the main chart.
            <br />- <strong>Data Insights:</strong> This graph represents the
            progression of cumulative tasks achieved over time. The dashed line
            indicates the expected trend based on initial projections. Adjust
            the view to focus on specific intervals and analyze your team's
            performance against planned milestones.
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
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            width: "130px", // Diameter of the circle
            height: "130px", // Diameter of the circle
            backgroundColor: "transparent",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        />
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
        <VictoryArea
          standalone={true}
          interpolation="natural"
          data={processedData}
          x="key"
          y="b"
        />
        <VictoryLine
          data={trendLineData}
          x="key"
          y="b"
          style={{
            data: { stroke: "#ADB5BD", strokeWidth: 1, strokeDasharray: "3,3" },
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
          data={processedData}
          x="key"
          y="b"
        />
      </VictoryChart>
    </Box>
  ) : (
    <div>Loading...</div>
  );
}

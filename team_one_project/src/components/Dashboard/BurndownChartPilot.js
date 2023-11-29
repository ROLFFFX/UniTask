import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
} from "victory";

export default function BurndownChart({ processedData }) {
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      const width = (window.innerWidth - 200) * (7 / 12);
      const height = (window.innerHeight - 64) * 0.45;
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
    <Box>
      <VictoryChart
        width={chartSize.width}
        height={chartSize.height * (5 / 6)}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          interpolation="natural"
          // style={{
          //   data: { stroke: "tomato" },
          // }}
          data={processedData}
          x="key"
          y="b"
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        width={chartSize.width}
        height={chartSize.height * (1 / 6)}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={handleZoom}
          />
        }
      >
        <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()} />
        <VictoryLine
          interpolation="natural"
          // style={{
          //   data: { stroke: "tomato" },
          // }}
          data={processedData}
          x="key"
          y="b"
        />
      </VictoryChart>
    </Box>
  ) : (
    <div></div>
  );
}

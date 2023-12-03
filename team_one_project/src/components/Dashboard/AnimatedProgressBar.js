/**
 * @fileoverview This file defines the AnimatedProgressBar component, which renders a
 * circular progress bar using the Victory charting library. It is used to visually represent
 * the progress of a task or set of tasks as a percentage, and will be rendered at the bottom
 * right corner of dashboard page - data visualization.
 */

import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { Box, Grid, Typography, Tooltip } from "@mui/material";

/**
 * AnimatedProgressBar - A functional component that renders a circular progress bar of
 * task points done / (task poitns for todo + task points for doing + taskpoints for done).
 *
 * This component takes progress data as a prop and uses it to calculate and display the
 * completion percentage of a task or set of tasks. It uses VictoryPie and VictoryAnimation
 * from the Victory charting library to render the progress bar, and MUI components
 * for layout and tooltips.
 *
 * Props:
 * @param {Object} progressData - The data used to calculate the progress percentage. It should
 *                                contain a 'progressBarData' object with numeric values.
 *
 * State:
 * @state @type {number} percent - The calculated completion percentage.
 * @state @type {number} done - The total value of completed tasks.
 * @state @type {number} total - The total value of all tasks.
 *
 * Functions:
 * calculateDoneRatio - Calculates the ratio of completed tasks to total tasks.
 * getData - Returns an array of data for the VictoryPie component based on the completion percentage.
 *
 * @returns {React.ReactElement} A React element representing the animated progress bar.
 */
export default function AnimatedProgressBar({ progressData }) {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (progressData && progressData.progressBarData) {
      const doneRatio = calculateDoneRatio(progressData);
      setPercent(doneRatio * 100);
    }
  }, [progressData]);

  const calculateDoneRatio = (progressData) => {
    const progressBarData = progressData.progressBarData;
    const total = Object.values(progressBarData).reduce(
      (sum, value) => sum + value,
      0
    );
    const doneValue = progressBarData.Done || 0;
    setDone(doneValue);
    setTotal(total);

    return total === 0 ? 0 : doneValue / total;
  };

  const data = getData(percent);

  function getData(percent) {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {/* Box for entire progress bar section. Note that it excludes headers. */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="-10px"
        >
          {/* Tooltip to show more detailed information */}
          <Tooltip
            title={
              <Typography
                style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
              >
                {`Tasks worth of ${done} task points are done out of ${total} taskpoints.`}
              </Typography>
            }
            arrow
            placement="top"
            TransitionProps={{ timeout: 600 }}
          >
            {/* Actual circular progress bar */}
            <svg viewBox="0 0 400 400" width="60%">
              <VictoryPie
                standalone={false}
                animate={{ duration: 1000 }}
                width={400}
                height={400}
                data={data}
                innerRadius={120}
                cornerRadius={25}
                labels={() => null}
                style={{
                  data: {
                    fill: ({ datum }) => {
                      let color;
                      if (percent <= 20) {
                        color = "#99e2b4";
                      } else if (percent <= 40) {
                        color = "#78c6a3";
                      } else if (percent <= 60) {
                        color = "#56ab91";
                      } else if (percent <= 80) {
                        color = "#469d89";
                      } else {
                        color = "#248277";
                      }
                      return datum.x === 1 ? color : "transparent";
                    },
                  },
                }}
              />
              {/* Animation added so that it animates the progress at initial render. */}
              <VictoryAnimation duration={1000} data={{ percent }}>
                {(newProps) => (
                  // Label is rendered inside of the Progress bar.
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={200}
                    text={`${Math.round(newProps.percent)}%`}
                    style={{ fontSize: 45 }}
                  />
                )}
              </VictoryAnimation>
            </svg>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
}

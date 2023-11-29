import React, { useState, useEffect } from "react";
import { Box, Divider, Grid } from "@mui/material";
import BurndownChart from "./BurndownChart";

function processTaskData(tasks, currentDateStr, creationDateStr) {
  const creationDate = new Date(creationDateStr);
  const currentDate = new Date(currentDateStr);
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const totalDays = Math.ceil((currentDate - creationDate) / oneDay);
  const intervalDays = 3;
  const numberOfIntervals = Math.ceil(totalDays / intervalDays);

  let intervals = [];
  for (let i = 0; i < numberOfIntervals; i++) {
    intervals.push({
      key: new Date(creationDate.getTime() + i * intervalDays * oneDay),
      b: 0,
    });
  }

  tasks.forEach((task) => {
    if (task.status === "Done") {
      const taskCompleteTime = new Date(task.expectedCompleteTime);
      if (taskCompleteTime >= creationDate && taskCompleteTime <= currentDate) {
        const intervalIndex = Math.floor(
          (taskCompleteTime - creationDate) / (intervalDays * oneDay)
        );
        // Add task points to all subsequent intervals
        for (let j = intervalIndex; j < intervals.length; j++) {
          intervals[j].b += task.taskPoints;
        }
      }
    }
  });

  // Adjust the last interval's key to be the current date
  if (intervals.length > 0) {
    intervals[intervals.length - 1].key = currentDate;
  }

  return intervals;
}

export default function VisualCharts(props) {
  const [formattedTasks, setFormattedTasks] = useState();
  // map over and format tasks. formattedTasks will contain all formatted main tasks
  useEffect(() => {
    // format data, slicing to leave only first item
    if (props.taskData && props.taskData.length > 0) {
      const firstItems = props.taskData.map((array) => array[0]);
      setFormattedTasks(firstItems);
    }
  }, [props]);
  const currentTime = new Date().toISOString();
  const creationTime = props.workspaceCreationTime;
  // At this point, we have:
  //    currentTime: current time in ISO String
  //    formattedTasks: list of main task JSON objects
  //    creationTime / props.workspaceCreationTime: contains workspace creation time in ISO String
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (formattedTasks && currentTime && creationTime) {
      // IMPORTANT: in block only runs when all variables are ready.
      // @todo process data
      const processingData = processTaskData(
        formattedTasks,
        currentTime,
        creationTime
      );
      setProcessedData(processingData);
    }
  }, [formattedTasks]);

  return (
    <React.Fragment>
      {/* Grid for entire data visual view */}
      <Grid
        container
        height="calc((100vh - 64px) * 0.9)"
        maxHeight="calc((100vh - 64px) * 0.9)"
        style={{ overflow: "auto", justifyContent: "center", display: "flex" }}
        width="calc((100vw - 200px)*8/12)"
      >
        {/* Grid item for BurndownChart */}
        {/* Grid for info bar */}
        {/* <Grid item xs={1} border={1}></Grid> */}
        {/* Grid for Burndown Chart */}
        <Grid
          item
          xs={12}
          height="calc((100vh - 64px)* 0.9 /2)"
          maxHeight="calc((100vh - 64px)*0.9 /2)"
          overflow="hidden"
        >
          <BurndownChart processedData={processedData} />
        </Grid>
        {/* Grid for other charts */}
        <Grid
          item
          xs={12}
          height="calc((100vh - 64px)*0.9 /2)"
          maxHeight="calc((100vh - 64px)*0.9 /2)"
          overflow="hidden"
        >
          <Divider />
        </Grid>
      </Grid>
    </React.Fragment>
    // <Box
    //   height="calc((100vh - 64px) * 0.9)"
    //   maxHeight="calc((100vh - 64px) * 0.9)"
    //   style={{ overflow: "auto", justifyContent: "center", display: "flex" }}
    //   className="custom-scrollbar"
    //   border={1}
    // >
    //   VisualCharts
    // </Box>
  );
}

import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BurndownChart from "./BurndownChart";
import PersonalChart from "./PersonalChart";
import useAuth from "../../hooks/useAuth";

// process task data list to convert it into a data set that burndownchart.js accepts. key be timestamp, value be accumulated task points achieved.
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
// this function processes personal task data. similar to processtaskdata, this function will only look at task corresponds to curent user
function processPersonalTaskData(
  tasks,
  currentDateStr,
  creationDateStr,
  currentUserEmail
) {
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
      personalPoints: 0,
    });
  }
  tasks.forEach((task) => {
    if (
      task.status === "Done" &&
      task.taskMemberAssigned.email === currentUserEmail
    ) {
      const taskCompleteTime = new Date(task.expectedCompleteTime);
      if (taskCompleteTime >= creationDate && taskCompleteTime <= currentDate) {
        const intervalIndex = Math.floor(
          (taskCompleteTime - creationDate) / (intervalDays * oneDay)
        );
        // Add task points to all subsequent intervals for personal total
        for (let j = intervalIndex; j < intervals.length; j++) {
          intervals[j].personalPoints += task.taskPoints;
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
  const { auth } = useAuth();
  const currentUserEmail = auth.user.userEmail;
  const [formattedTasks, setFormattedTasks] = useState();
  const [processedPersonalData, setProcessedPersonalData] = useState([]);

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
      const processingData = processTaskData(
        formattedTasks,
        currentTime,
        creationTime
      );
      setProcessedData(processingData);
      // process personal data
      const personalData = processPersonalTaskData(
        formattedTasks,
        currentTime,
        creationTime,
        currentUserEmail
      );
      setProcessedPersonalData(personalData);
    }
  }, [formattedTasks, creationTime, currentUserEmail]);

  return (
    <React.Fragment>
      {/* Conditional Rendering */}
      {processedData.length > 0 && processedPersonalData.length > 0 ? (
        <Grid
          container
          height="calc((100vh - 64px) * 0.9)"
          maxHeight="calc((100vh - 64px) * 0.9)"
          style={{
            overflow: "auto",
            justifyContent: "center",
            display: "flex",
          }}
          width="calc((100vw - 200px)*8/12)"
        >
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
          {/* Grid for Personal Burndown Chart */}
          <Grid
            item
            xs={12}
            height="calc((100vh - 64px)*0.9 /2)"
            maxHeight="calc((100vh - 64px)*0.9 /2)"
            overflow="hidden"
          >
            <Divider />
            <PersonalChart processedPersonalData={processedPersonalData} />
          </Grid>
        </Grid>
      ) : (
        <div></div> // Render an empty div if condition is not met
      )}
    </React.Fragment>
  );
}

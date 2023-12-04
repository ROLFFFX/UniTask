import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import commontimedisplayed from "../../images/commontimedisplayed.png";
import createevent1 from "../../images/createevent1.png";
import createevent2 from "../../images/createevent2.png";
import createevent3 from "../../images/createevent3.png";
import createfromthere from "../../images/createfromthere.png";
import memberslist from "../../images/memberslist.png";
import renameordelete from "../../images/renameordelete.png";
import reschedule1 from "../../images/reschedule1.png";
import reschedule2 from "../../images/reschedule2.png";

import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import "./WeeklyCalendar.css";

const styles = {
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    padding: "0 50px",
  },
  calendar: {
    width: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
  },
};

const WeeklyCalendar = () => {
  const { auth } = useAuth();

  const [guide, setGuide] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  const createEventImages = [
    {
      img: createevent1,
      title: "1. Select a Time Range",
    },
    {
      img: createevent2,
      title: "2. Name the Event",
    },
    {
      img: createevent3,
      title: "3. Event Successfully created",
    },
  ];

  const rescheduleEventImages = [
    {
      img: reschedule1,
      title: "Drag to another time",
    },
    {
      img: reschedule2,
      title: "Extend or shorten duration",
    },
  ];

  const renameOrDeleteImages = [
    {
      img: renameordelete,
      title: "Rename Or Delete",
    },
  ];

  const availabilityPollImages = [
    {
      img: memberslist,
      title: "Memebers who has submitted their availability",
    },
    {
      img: commontimedisplayed,
      title: "Your common availability displayed on this page",
    },
    {
      img: createfromthere,
      title: "Create an event from there!",
    },
  ];

  const handleGuideOpen = () => {
    setGuide(true);
  };

  //associated with the expand and collapse tutorial items
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleGuideClose = () => {
    setGuide(false);
    //set of users that has opened this page on this browser
    let thisBrUserSet = new Set(
      JSON.parse(localStorage.getItem("notFirstTime")) || []
    ); // Fallback to empty array if null
    thisBrUserSet = new Set([...thisBrUserSet, userName]);
    // console.log("appended notFirstTime user set", thisBrUserSet);
    localStorage.setItem(
      "notFirstTime",
      JSON.stringify(Array.from(thisBrUserSet))
    );
  };

  const projectTitle = auth.selectedWorkspace;

  const [handleRefresh, setHandleRefresh] = useState([]);

  const calendarRef = useRef(null);

  const navigate = useNavigate();

  //get the start date
  const [startDate, setStartDate] = useState(new DayPilot.Date());

  const [inSession, setInSession] = useState(false);

  //Your group is in session if there are any timeslots submitted
  const fetchInSession = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}api/test/timeslot/inSession/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      setInSession(response.data);
      // console.log(response.data);
    } catch (e) {
      console.error("Error Confirming Existing Project Timeslots:", e);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await axios.get(`${ENDPOINT_URL}users/getUsername`, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      setUserName(response.data);
      const userSet = new Set(
        JSON.parse(localStorage.getItem("notFirstTime") || "[]")
      );
      // console.log("notFirstTime user set", userSet);
      setGuide(!userSet.has(response.data));
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const [membersList, setMembersList] = useState([]);
  //get list of members who has submitted their available times
  const fetchSubmittedMembers = async () => {
    let returnlist = [];
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}api/test/timeslot/members/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      if (response.data.length > 0) {
        setMembersList(response.data);
      }
      // console.log("members who has submitted availability", response.data);
    } catch (e) {
      console.error("Error Fetching Members Who Has Submitted Timeslots:", e);
    }
  };

  //(AVALIABLE TIME SLOTS) Get common time slots
  const fetchAvaliable = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}api/test/timeslot/overlap/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      const avaliableTimeSlots = [];

      // Iterate over the response data and process each meeting
      for (let i = 0; i < response.data.length; i++) {
        const avaliable = response.data[i];
        avaliableTimeSlots.push({
          startTime: avaliable.startTime,
          endTime: avaliable.endTime,
        });
      }
      // console.log("fetched availableTS", avaliableTimeSlots);
      return avaliableTimeSlots;
    } catch (error) {
      console.error("Error fetching avaliableTimeSlots:", error);
      return []; // Return an empty array in case of error
    }
  };

  //(MEETING) Get current meetings
  const fetchMeetings = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}api/test/meeting/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      const meetings = [];

      // Iterate over the response data and process each meeting
      for (let i = 0; i < response.data.length; i++) {
        const meeting = response.data[i];
        meetings.push({
          meetingId: meeting.meetingId,
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
        });
      }

      return meetings;
    } catch (error) {
      console.error("Error fetching meetings:", error);
      return []; // Return an empty array in case of error
    }
  };

  const [selectedRange, setSelectedRange] = useState(null);

  const TEMP_EVENT_ID = "temp-selected-range";
  const onTimeRangeSelected = (args) => {
    const newStart = new Date(args.start);
    const newEnd = new Date(args.end);

    // Adjust for time zone offset
    newStart.setMinutes(newStart.getMinutes() - newStart.getTimezoneOffset());
    newEnd.setMinutes(newEnd.getMinutes() - newEnd.getTimezoneOffset());

    let updatedStart, updatedEnd;

    if (selectedRange) {
      const currentStart = new Date(selectedRange.start);
      const currentEnd = new Date(selectedRange.end);

      if (newStart <= currentEnd && newEnd >= currentStart) {
        updatedStart = newStart < currentStart ? newStart : currentStart;
        updatedEnd = newEnd > currentEnd ? newEnd : currentEnd;
      } else {
        updatedStart = newStart;
        updatedEnd = newEnd;
      }
    } else {
      updatedStart = newStart;
      updatedEnd = newEnd;
    }

    const newRange = { start: updatedStart, end: updatedEnd };
    setSelectedRange(newRange);
    localStorage.setItem("selectedRange", JSON.stringify(newRange)); //to display the selected range without refreshing the page

    // Update the calendar with a temporary event
    const dp = calendarRef.current.control;
    if (dp.events.find(TEMP_EVENT_ID)) {
      dp.events.remove(TEMP_EVENT_ID);
    }
    dp.events.add(
      new DayPilot.Event({
        start: updatedStart,
        end: updatedEnd,
        id: TEMP_EVENT_ID,
        text: "Selected Time Range",
        backColor: "purple",
        cssClass: "temp-selection",
        moveDisabled: true,
        resizeDisabled: true,
      })
    );
    dp.update();
  };

  const createMeeting = async () => {
    if (!selectedRange) return;

    // Convert start and end times to ISO string format
    let startTime = new Date(selectedRange.start);
    let endTime = new Date(selectedRange.end);

    // Adjust for time zone offset
    startTime.setMinutes(
      startTime.getMinutes() + startTime.getTimezoneOffset()
    );
    endTime.setMinutes(endTime.getMinutes() + endTime.getTimezoneOffset());

    let startTimeDisplay = formatTimeForDisplay(startTime);
    let endTimeDisplay = formatTimeForDisplay(endTime);

    // convert to ISO String
    startTime = startTime.toISOString();
    endTime = endTime.toISOString();

    // Open a modal to get meeting details
    const titleResponse = await DayPilot.Modal.prompt("Name the Event:", "");
    if (!titleResponse || titleResponse.canceled) {
      clearSelection();
      return;
    }
    const title = titleResponse.result;

    // Confirmation for creating a meeting for the selected time range
    const confirmationResponse = await DayPilot.Modal.confirm(
      `Create a meeting "${title}" from ${startTimeDisplay} to ${endTimeDisplay}?`
    );
    if (!confirmationResponse || confirmationResponse.canceled) {
      clearSelection();
      return;
    }

    // Create a new meeting object with the selected time range
    const newMeeting = {
      title: title,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      // Send the newMeeting data to your backend or handle it as needed
      const response = await axios.post(
        `${ENDPOINT_URL}api/test/meeting/${projectTitle}`,
        newMeeting,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );

      // console.log("Meeting created:", response.data);
      // console.log("response", response.status);
    } catch (error) {
      console.error(
        "Error creating meeting:",
        error.response ? error.response.data : error
      );
    }

    clearSelection();
    setHandleRefresh([...handleRefresh, newMeeting]); // Update state to trigger a refresh
  };

  const clearSelection = () => {
    // Remove the temporary event and clear selection
    const dp = calendarRef.current.control;
    dp.events.remove(TEMP_EVENT_ID);
    localStorage.removeItem("selectedRange");
    setSelectedRange(null);
  };

  const formatTimeForDisplay = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  };

  //edit meeting time (when dragged/extended/shortened)
  const editEventTime = async (args) => {
    const timeZoneOffset = getTimeZoneOffsetInHours();

    //adjust time difference
    let startTAdj = args.newStart.toDate();
    startTAdj.setHours(startTAdj.getHours() + timeZoneOffset);
    let endTAdj = args.newEnd.toDate();
    endTAdj.setHours(endTAdj.getHours() + timeZoneOffset);

    let startTDisplay = formatTimeForDisplay(startTAdj);
    let endTDisplay = formatTimeForDisplay(endTAdj);

    const result = await DayPilot.Modal.confirm(
      `Reschedule "${args.e.data.text}" to ${startTDisplay} ~ ${endTDisplay}?`
    );
    if (result.result) {
      // User confirmed, proceed with the event move
      try {
        const updatedMeeting = {
          meetingId: args.e.data.id, // Assuming this is how your event data is structured
          title: args.e.data.text,
          startTime: startTAdj.toISOString(),
          endTime: endTAdj.toISOString(),
        };
        // Update request to the backend
        const response = await axios.put(
          `${ENDPOINT_URL}api/test/meeting/${projectTitle}`,
          updatedMeeting,
          {
            headers: {
              Authorization: `Bearer ${auth.user.userJWT}`,
            },
          }
        );
        clearSelection(); //cancel the create meeting action in progress
        setHandleRefresh([...handleRefresh]);
      } catch (error) {
        console.error("Error updating meeting:", error);
      }
    }
  };

  //edit meeting Title
  const editEventTitle = async (e) => {
    // Prompt for new title
    const titleResponse = await DayPilot.Modal.prompt(
      "New Title:",
      e.data.text
    );
    if (!titleResponse || titleResponse.canceled) return;
    const title = titleResponse.result;

    const timeZoneOffset = getTimeZoneOffsetInHours();

    //adjust time difference
    let startTAdj = e.data.start.toDate();
    startTAdj.setHours(startTAdj.getHours() + timeZoneOffset);
    let endTAdj = e.data.end.toDate();
    endTAdj.setHours(endTAdj.getHours() + timeZoneOffset);

    try {
      const updatedMeeting = {
        meetingId: e.data.id, // Assuming this is how your event data is structured
        title: title,
        startTime: startTAdj.toISOString(),
        endTime: endTAdj.toISOString(),
      };
      // Update request to the backend
      const response = await axios.put(
        `${ENDPOINT_URL}api/test/meeting/${projectTitle}`,
        updatedMeeting,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );

      //console.log('Meeting updated:', response.data);
      clearSelection(); //cancel the create meeting action in progress
      setHandleRefresh([...handleRefresh]);
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  //delete the meeting
  const deleteMeeting = async (e) => {
    if (!e || !e.data || !e.data.id) return;

    try {
      // Prepare the meeting data to be sent
      const meetingToDelete = {
        meetingId: e.data.id,
        title: e.data.text, // Assuming 'text' contains the title
        startTime: new Date(e.data.start.value).toISOString(),
        endTime: new Date(e.data.end.value).toISOString(),
      };

      // Log the meeting info to be deleted
      // console.log("Meeting to delete:", meetingToDelete);

      // Send the meeting data to your backend
      const response = await axios.delete(
        `${ENDPOINT_URL}api/test/meeting/${projectTitle}/${e.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );

      // console.log("Meeting deleted:", meetingToDelete);

      const dp = calendarRef.current.control;
      dp.events.remove(e);

      // Refresh the events list if necessary
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  //get time difference between the ISO string and the local time
  const getTimeZoneOffsetInHours = () => {
    // console.log("get time difference");
    const currentDateTime = new Date();
    const offsetInMinutes = currentDateTime.getTimezoneOffset();
    const offsetInHours = offsetInMinutes / 60;
    return offsetInHours;
  };

  //(AVALIABLE TIME SLOTS) Fix time difference between the ISO string and the local time
  const adjustTimeZoneAvaliable = (meetings) => {
    // const thirtyMinMeetings = convertTo30MinSlots(meetings);
    // console.log("30mins", thirtyMinMeetings)
    const timeZoneOffset = getTimeZoneOffsetInHours();

    const processedTS = [];
    // return thirtyMinMeetings.map(meeting => {
    meetings.forEach((meeting) => {
      let adjustedStartTime = new Date(meeting.startTime);
      adjustedStartTime.setHours(adjustedStartTime.getHours() - timeZoneOffset);

      let adjustedEndTime = new Date(meeting.endTime);
      adjustedEndTime.setHours(adjustedEndTime.getHours() - timeZoneOffset);

      processedTS.push({
        text: "common available time",
        start: new DayPilot.Date(adjustedStartTime),
        end: new DayPilot.Date(adjustedEndTime),
        cssClass: "available_slots",
        //make timeslots static
        moveDisabled: true,
        resizeDisabled: true,
        contextMenuDisabled: true,
      });
    });
    // console.log("processedTS", processedTS);
    return processedTS;
  };

  //(MEETING) Fix time difference between the ISO string and the local time
  const adjustTimeZoneMeet = (meetings) => {
    const timeZoneOffset = getTimeZoneOffsetInHours();

    return meetings.map((meeting) => {
      let adjustedStartTime = new Date(meeting.startTime);
      adjustedStartTime.setHours(adjustedStartTime.getHours() - timeZoneOffset);

      let adjustedEndTime = new Date(meeting.endTime);
      adjustedEndTime.setHours(adjustedEndTime.getHours() - timeZoneOffset);

      return {
        id: meeting.meetingId,
        start: new DayPilot.Date(adjustedStartTime),
        end: new DayPilot.Date(adjustedEndTime),
        text: meeting.title,
        cssClass: "calendar_black_event_inner",
        //disallow dragging the events
      };
    });
  };

  //Clear All Avaliable time slots
  const clearAvailableSlots = async () => {
    DayPilot.Modal.confirm(
      "Are you sure you want to end this availability poll? Members' available time submissions will be cleared. "
    ).then(async function (result) {
      if (!result.result) {
        // User clicked 'Cancel'
        return;
      }

      try {
        // Make a request to your backend to delete all available time slots
        const response = await axios.delete(
          `${ENDPOINT_URL}api/test/timeslot/clearall/${projectTitle}`,
          {
            headers: {
              Authorization: `Bearer ${auth.user.userJWT}`,
            },
          }
        );

        setHandleRefresh([...handleRefresh]);

        if (response.status === 201) {
          //not sure 200 or 201
          // console.log("All available time slots cleared");
          // You may want to update your UI or state here as needed
        }
      } catch (error) {
        console.error("Error clearing available time slots:", error);
      }
      clearSelection();
    });
  };

  const getContextMenuForEvent = (event) => {
    if (event.data.cssClass === "calendar_black_event_inner") {
      return new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: async (args) => {
              await deleteMeeting(args.source);
            },
          },
          {
            text: "Rename",
            onClick: async (args) => {
              await editEventTitle(args.source);
            },
          },
        ],
      });
    }
    return null; // No context menu for events without the specific class
  };

  //calendar default structure
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    startDate: startDate,
    allowEventOverlap: true,
    onTimeRangeSelected: (args) => onTimeRangeSelected(args),
    eventMoveHandling: "update",
    eventResizeHandling: "update",
    onEventRightClick: (args) => {
      const contextMenu = getContextMenuForEvent(args.e);
      if (contextMenu) {
        contextMenu.show(args.e);
      }
    },
  });

  const goToPreviousWeek = () => {
    setStartDate(startDate.addDays(-7));
    clearSelection();
  };

  const goToNextWeek = () => {
    setStartDate(startDate.addDays(7));
    clearSelection();
  };

  const [tipsOpen, setTipsOpen] = useState(null);
  const openn = Boolean(tipsOpen);

  // UseEffect for setting up calendar events
  useEffect(() => {
    const initializeCalendar = async () => {
      fetchInSession();
      fetchSubmittedMembers();
      fetchUserName();
      const [available, meetings] = await Promise.all([
        fetchAvaliable(),
        fetchMeetings(),
      ]);

      //localStorage.clear();

      //reflects whether it's the first time the user visits the page
      // console.log("guide open", guide);
      //console.log("available",available);
      const processedAvailable = adjustTimeZoneAvaliable(available);
      const adjustedMeetings = adjustTimeZoneMeet(meetings);

      // Combine non-conflicting available slots and meetings
      const combinedEvents = [...processedAvailable, ...adjustedMeetings];
      setCalendarConfig((prevConfig) => ({
        ...prevConfig,
        events: combinedEvents,
        startDate: startDate,
      }));
      //console.log("processedAvailable",processedAvailable);
    };

    initializeCalendar();
  }, [startDate, handleRefresh]);

  return (
    <div className={"main-container"}>
      {inSession ? (
        <List
          className={"membersListWrap"}
          disablePadding
        >
          <ListItem>
            <ListItemText primary={
              <Typography color="secondary">
                There's a Group Availability Poll in Progress... Members Who Have Submitted Their Available Time:
              </Typography>
            }/>
          </ListItem>
          <ListItem>
            <List className={"membersList"}>
              {membersList.map((name, index) => (
                <ListItem key={index} className={"membersList-item"}>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
      ) : null}
      <div className="week-navigation" style={styles.wrap}>
        <div className="button-row" style={styles.header}>
          <h1>Group Events Schedule</h1>
          <div className={"header-right"}>
            {inSession ? (
              <div>
                <button onClick={() => navigate("/meeting/selectmeeting")}>
                  Submit Your Available Time
                </button>
                <button
                  className="button-clear-slots"
                  onClick={clearAvailableSlots}
                >
                  End Poll
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={(e) => setTipsOpen(e.currentTarget)}
                  aria-owns={openn ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                >
                  Start A Group Availability Poll
                </button>
                <Dialog
                  id={"reminder-dialog"}
                  open={openn}
                  onClose={() => setTipsOpen(null)}
                >
                  <List>
                    <ListItem>
                      <ListItemText primary="Tips" />
                      <Button
                        id={"proceed-to-poll"}
                        onClick={() => navigate("/meeting/selectmeeting")}
                        color="secondary"
                        variant="contained"
                      >
                        Got it! Proceed to Poll
                      </Button>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Please *remind your team* ⏰ 👥 to submit their available time," />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="and don't forget to *confirm your selection* ✅ before leaving the page!" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Common available time will be displayed on this group event calendar," />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="as well as members who has submitted to the availability poll," />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="so that you can come back and schedule your group events accordingly." />
                    </ListItem>
                  </List>
                </Dialog>
              </div>
            )}
            <Button aria-label="help" onClick={handleGuideOpen}>
              <HelpOutlineIcon />
            </Button>
          </div>
        </div>
        <Dialog
          open={guide}
          onClose={handleGuideClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"How to Manage My Group Schedule"}
          </DialogTitle>
          <DialogContent>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  Create A Group Event
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Click or drag on the calendar to select a time range
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ImageList
                  sx={{ width: 500, height: "100%" }}
                  cols={1}
                  rowHeight={500}
                >
                  {createEventImages.map((item) => (
                    <ImageListItem key={item.img}>
                      <img src={item.img} alt={item.title} loading="lazy" />
                      <ImageListItemBar title={item.title} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  Reschedule An Event
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Drag, extend, or shorten the event blocks to reschedule
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ImageList
                  sx={{ width: 500, height: "100%" }}
                  cols={2}
                  rowHeight={200}
                >
                  {rescheduleEventImages.map((item) => (
                    <ImageListItem key={item.img}>
                      <img src={item.img} alt={item.title} loading="lazy" />
                      <ImageListItemBar title={item.title} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  Rename or Delete An Event
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Right click on the event blocks to see these options
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ImageList
                  sx={{ width: 500, height: "100%" }}
                  cols={1}
                  rowHeight={500}
                >
                  {renameOrDeleteImages.map((item) => (
                    <ImageListItem key={item.img}>
                      <img src={item.img} alt={item.title} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  Group Availability Poll
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Submit your availabilities, see who has submitted and their
                  common available time
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ImageList
                  sx={{ width: 500, height: "100%" }}
                  cols={1}
                  rowHeight={500}
                >
                  {availabilityPollImages.map((item) => (
                    <ImageListItem key={item.img}>
                      <img src={item.img} alt={item.title} loading="lazy" />
                      <ImageListItemBar title={item.title} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGuideClose} color="secondary" variant="contained">
              Got it! Don't Show This Again
            </Button>
          </DialogActions>
        </Dialog>
        {selectedRange ? (
          <div className="below-header">
            <Button className={"button-create"}
                    onClick={createMeeting}
                    color="secondary"
                    variant="contained">
              Create Event
            </Button>
            <Button className={"button-cancel"}
                    onClick={clearSelection}
                    color="secondary"
                    variant="contained">
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <div className={"button-placeholder"} />
          </div>
        )}
        <div className="prev-next">
          <button className="button-prev" onClick={goToPreviousWeek}>
              &lt; Previous Week
          </button>
          <button className="button-next" onClick={goToNextWeek}>
              Next Week &gt;
          </button>
        </div>
        <div className="calendar-wrapper">
          <DayPilotCalendar
            key={calendarConfig.cellDuration}
            style={styles.calendar}
            {...calendarConfig}
            ref={calendarRef}
            onTimeRangeSelected={onTimeRangeSelected}
            onEventResized={editEventTime}
            onEventMoved={editEventTime}
          />
        </div>
      </div>
    </div>
  );
};

export { WeeklyCalendar };

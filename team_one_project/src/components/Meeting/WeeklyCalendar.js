import React, { useState, useRef, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { DayPilot, DayPilotCalendar, DayPilotNavigator, DayPilotScheduler } from "@daypilot/daypilot-lite-react";
import './WeeklyCalendar.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import useAuth from "../../hooks/useAuth";
import {ENDPOINT_URL} from "../../hooks/useConfig";

const styles = {
    wrap: {
        justifyContent: "center",
        alignItems: "center",
        //height: "100vh",
        padding: "0 50px"
    },
    calendar: {
        width: "100%",
        maxWidth: "800px"
    },
    header: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "800px",
        marginBottom: "10px",
        marginTop:"10px"
    },
};


const WeeklyCalendar = () => {

    const { auth } = useAuth();

    const projectTitle = auth.selectedWorkspace;

    const [handleRefresh, setHandleRefresh] = useState([]);

    const calendarRef = useRef(null);

    const navigate = useNavigate();

    //get the start date
    const [startDate, setStartDate] = useState(new DayPilot.Date());

    const [inSession, setInSession] = useState(false);

    //Your group is in session if there are any timeslots submitted
    const fetchInSession = async () => {
        try{
            const response = await axios.get(`${ENDPOINT_URL}api/test/timeslot/inSession/${projectTitle}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.userJWT}`,
                    },
                }
            );
            setInSession(response.data);
            console.log(response.data);
        }catch (e){
            console.error('Error Confirming Existing Project Timeslots:', e);
        }
    }

    const [membersList, setMembersList] = useState([]);
    //get list of members who has submitted their available times
    const fetchSubmittedMembers = async () => {
        let returnlist = [];
        try{
            const response = await axios.get(`${ENDPOINT_URL}api/test/timeslot/members/${projectTitle}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.userJWT}`,
                    },
                }
            );
            if (response.data.length>0) {setMembersList(response.data);}
            console.log(response.data);
        }catch (e){
            console.error('Error Fetching Members Who Has Submitted Timeslots:', e);
        }
    }

    //(AVALIABLE TIME SLOTS) Get common time slots
    const fetchAvaliable = async () => {
        try {
            const response = await axios.get(`${ENDPOINT_URL}api/test/timeslot/overlap/${projectTitle}`,
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
                    endTime: avaliable.endTime
                });
            }
            console.log("fetched availableTS",avaliableTimeSlots);
            return avaliableTimeSlots;
        } catch (error) {
            console.error('Error fetching avaliableTimeSlots:', error);
            return []; // Return an empty array in case of error
        }
    };

    //(MEETING) Get current meetings
    const fetchMeetings = async () => {
        console.log("fetchMeetings");
        try {
            const response = await axios.get(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`,
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
                    endTime: meeting.endTime
                });
            }

            return meetings;
        } catch (error) {
            console.error('Error fetching meetings:', error);
            return []; // Return an empty array in case of error
        }
    };

    const [selectedRange, setSelectedRange] = useState(null);

    const TEMP_EVENT_ID = 'temp-selected-range';
    const onTimeRangeSelected = args => {
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
        localStorage.setItem('selectedRange', JSON.stringify(newRange));//to display the selected range without refreshing the page

        // Update the calendar with a temporary event
        const dp = calendarRef.current.control;
        if (dp.events.find(TEMP_EVENT_ID)) {dp.events.remove(TEMP_EVENT_ID);}
        dp.events.add(new DayPilot.Event({
            start: updatedStart,
            end: updatedEnd,
            id: TEMP_EVENT_ID,
            text: "Selected Time Range",
            backColor: "purple",
            cssClass: "temp-selection",
            moveDisabled: true,
            resizeDisabled: true
        }));
        dp.update();
    };

    const createMeeting = async () => {
        if (!selectedRange) return;

        // Convert start and end times to ISO string format
        let startTime = new Date(selectedRange.start);
        let endTime = new Date(selectedRange.end);

        // Adjust for time zone offset
        startTime.setMinutes(startTime.getMinutes() + startTime.getTimezoneOffset());
        endTime.setMinutes(endTime.getMinutes() + endTime.getTimezoneOffset());

        let startTimeDisplay = formatTimeForDisplay(startTime);
        let endTimeDisplay = formatTimeForDisplay(endTime);

        // convert to ISO String
        startTime = startTime.toISOString();
        endTime = endTime.toISOString()

        // Open a modal to get meeting details
        const titleResponse = await DayPilot.Modal.prompt("Title for the meeting:", "");
        if (!titleResponse || titleResponse.canceled) {
            clearSelection();
            return;
        }
        const title = titleResponse.result;

        // Confirmation for creating a meeting for the selected time range
        const confirmationResponse = await DayPilot.Modal.confirm(`Create a meeting "${title}" from ${startTimeDisplay} to ${endTimeDisplay}?`);
        if (!confirmationResponse || confirmationResponse.canceled) {
            clearSelection();
            return;
        }

        // Create a new meeting object with the selected time range
        const newMeeting = {
            title: title,
            startTime: startTime,
            endTime: endTime
        };

        try {
            // Send the newMeeting data to your backend or handle it as needed
            const response = await axios.post(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`
                , newMeeting, {
                    headers: {
                        Authorization: `Bearer ${auth.user.userJWT}`,
                    },
                });

            console.log('Meeting created:', response.data);
            console.log("response", response.status);
        } catch (error){
            console.error('Error creating meeting:', error.response ? error.response.data : error);
        }

        clearSelection();
        setHandleRefresh([...handleRefresh, newMeeting]); // Update state to trigger a refresh
    };

    const clearSelection = () => {
        // Remove the temporary event and clear selection
        const dp = calendarRef.current.control;
        dp.events.remove(TEMP_EVENT_ID);
        localStorage.removeItem('selectedRange');
        setSelectedRange(null);
    }

    const formatTimeForDisplay = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return date.toLocaleString('en-US', options);
    };

    //edit meeting time (when dragged/extended/shortened)
    const editEventTime = async args => {

        const timeZoneOffset = getTimeZoneOffsetInHours();

        //adjust time difference
        let startTAdj = args.newStart.toDate();
        startTAdj.setHours(startTAdj.getHours() + timeZoneOffset);
        let endTAdj = args.newEnd.toDate();
        endTAdj.setHours(endTAdj.getHours() + timeZoneOffset);

        let startTDisplay = formatTimeForDisplay(startTAdj);
        let endTDisplay = formatTimeForDisplay(endTAdj);

        const result = await DayPilot.Modal.confirm(`Reschedule "${args.e.data.text}" to ${startTDisplay} ~ ${endTDisplay}?`);
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
                const response = await axios.put(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`, updatedMeeting, {
                    headers: {
                        Authorization: `Bearer ${auth.user.userJWT}`,
                    },
                });
                clearSelection(); //cancel the create meeting action in progress
                setHandleRefresh([...handleRefresh]);
            } catch (error) {
                console.error('Error updating meeting:', error);
            }
        }
    };

    //edit meeting Title
    const editEventTitle = async (e) => {

        // Prompt for new title
        const titleResponse = await DayPilot.Modal.prompt("New Title:", e.data.text);
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
            const response = await axios.put(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`, updatedMeeting, {
                headers: {
                    Authorization: `Bearer ${auth.user.userJWT}`,
                },
            });

            //console.log('Meeting updated:', response.data);
            clearSelection(); //cancel the create meeting action in progress
            setHandleRefresh([...handleRefresh]);
        } catch (error) {
            console.error('Error updating meeting:', error);
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
            console.log('Meeting to delete:', meetingToDelete);


            // Send the meeting data to your backend
            const response = await axios.delete(`${ENDPOINT_URL}api/test/meeting/${projectTitle}/${e.data.id}`, {
                headers: {
                    Authorization: `Bearer ${auth.user.userJWT}`,
                },
            });

            console.log('Meeting deleted:', meetingToDelete);

            const dp = calendarRef.current.control;
            dp.events.remove(e);

            // Refresh the events list if necessary
        } catch (error) {
            console.error('Error deleting meeting:', error);
        }
    };


    //TODO: convert time slots to 30 mins duration
    const convertTo30MinSlots = (meetings) => {
        const slots = [];

        meetings.forEach(meeting => {
            let currentStart = new Date(meeting.startTime);
            let end = new Date(meeting.endTime);

            while (currentStart < end) {
                let currentEnd = new Date(currentStart.getTime() + 30 * 60000); // 30 minutes later

                if (currentEnd > end) {
                    currentEnd = new Date(end); // Adjust if the last slot exceeds the original end time
                }

                slots.push({
                    start: currentStart.toISOString(),
                    end: currentEnd.toISOString(),
                });

                currentStart = new Date(currentEnd); // Move to the next slot
            }
        });

        return slots;
    };


    //get time difference between the ISO string and the local time
    const getTimeZoneOffsetInHours = () => {
        console.log("get time difference")
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

        const processedTS = []
        // return thirtyMinMeetings.map(meeting => {
        meetings.forEach(meeting => {
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
                contextMenuDisabled: true
            });
        })
        console.log("processedTS", processedTS);
        return processedTS;
    };


    //(MEETING) Fix time difference between the ISO string and the local time
    const adjustTimeZoneMeet = (meetings) => {
        const timeZoneOffset = getTimeZoneOffsetInHours();

        return meetings.map(meeting => {
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

    //TODO: (COMBINE) Function to check if two time periods overlap
    const doTimesOverlap = (start1, end1, start2, end2) => {
        return start1 < end2 && start2 < end1;
    };

    //TODO: (COMBINE) Function to filter out available slots that conflict with meetings
    const filterConflictingSlots = (availableSlots, meetings) => {
        return availableSlots.filter(availableSlot => {
            const availableStart = new Date(availableSlot.start);
            const availableEnd = new Date(availableSlot.end);

            // Check if this slot overlaps with any meeting
            return !meetings.some(meeting => {
                const meetingStart = new Date(meeting.start);
                const meetingEnd = new Date(meeting.end);
                return doTimesOverlap(availableStart, availableEnd, meetingStart, meetingEnd);
            });
        });
    };

    //TODO: Buttons for clear all avaliable time slots prompt
    const customConfirm = (message) => {
        return new Promise(resolve => {
            DayPilot.Modal.showHtml(`
                <div>
                    <p>${message}</p>
                    <button id="yes">Yes</button>
                    <button id="no">No, Maybe Later</button>
                </div>
            `).then(modal => {
                if (modal.canceled) {
                    resolve(false);
                    return;
                }

                document.getElementById("yes").onclick = () => {
                    modal.close();
                    resolve(true);
                };

                document.getElementById("no").onclick = () => {
                    modal.close();
                    resolve(false);
                };
            });
        });
    };


    //Clear All Avaliable time slots
    const clearAvailableSlots = async () => {

        DayPilot.Modal.confirm("Are you sure you want to end this scheduling session? Members' available time submissions will be cleared. ")
            .then(async function(result) {
                if (!result.result) { // User clicked 'Cancel'
                    return;
                }

                try {
                    // Make a request to your backend to delete all available time slots
                    const response = await axios.delete(`${ENDPOINT_URL}api/test/timeslot/clearall/${projectTitle}`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.user.userJWT}`,
                            },
                        }
                    );

                    setHandleRefresh([...handleRefresh]);

                    if (response.status === 201) { //not sure 200 or 201
                        console.log('All available time slots cleared');
                        // You may want to update your UI or state here as needed
                    }
                } catch (error) {
                    console.error('Error clearing available time slots:', error);
                }
        });
    };

    const getContextMenuForEvent = (event) => {
        if (event.data.cssClass === "calendar_black_event_inner") {
            return new DayPilot.Menu({
                items: [
                    {
                        text: "Delete",
                        onClick: async args => {
                            await deleteMeeting(args.source);
                        }
                    },
                    {
                        text: "Rename",
                        onClick: async args => {
                            await editEventTitle(args.source);
                        }
                    }
                ]
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
        onTimeRangeSelected: args => onTimeRangeSelected(args),
        eventMoveHandling: "update",
        eventResizeHandling: "update",
        onEventRightClick: args => {
                const contextMenu = getContextMenuForEvent(args.e);
                if (contextMenu) {
                    contextMenu.show(args.e);
                }
        }
    });

    const goToPreviousWeek = () => {
        setStartDate(startDate.addDays(-7));
    };

    const goToNextWeek = () => {
        setStartDate(startDate.addDays(7));
    };

    // UseEffect for setting up calendar events
    useEffect(() => {
        const initializeCalendar = async () => {
            fetchInSession();
            fetchSubmittedMembers();
            const [available, meetings] = await Promise.all([fetchAvaliable(), fetchMeetings()]);

            //console.log("available",available);
            const processedAvailable = adjustTimeZoneAvaliable(available);
            const adjustedMeetings = adjustTimeZoneMeet(meetings);

            // Filter out conflicting slots
            //const nonConflictingAvailable = filterConflictingSlots(processedAvailable, adjustedMeetings);

            // Combine non-conflicting available slots and meetings
            const combinedEvents = [...processedAvailable, ...adjustedMeetings];
            setCalendarConfig(prevConfig => ({
                ...prevConfig,
                events: combinedEvents,
                startDate: startDate
            }));
            //console.log("processedAvailable",processedAvailable);
        };

        initializeCalendar();
    }, [startDate, handleRefresh]);

    return (
        <div className={"main-container"}>
            {inSession?(
                <List
                    className={"membersListWrap"}
                    disablePadding
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            There's a Group Polling Session in Progress... Members Who Have Submitted Their Available Time:
                        </ListSubheader>
                    }
                >
                    <ListItem>
                        <List className={"membersList"}>
                            {membersList.map((name, index) => (
                                <ListItem key = {index}>
                                    <ListItemText primary={name}/>
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                </List>
            ):null
            }
            <div className="week-navigation" style={styles.wrap}>
                <div className="button-row" style={styles.header}>
                    {inSession?(
                            <h2>Common Availability Overview</h2>
                        ):(
                            <h2>Current Group Schedule</h2>
                        )
                    }
                    <button className="button-prev" onClick={goToPreviousWeek}>
                        &lt; Previous Week
                    </button>
                    <button className="button-next" onClick={goToNextWeek}>
                        Next Week &gt;
                    </button>
                    {inSession? (
                        <div>
                            <button onClick={() => navigate("/meeting/selectmeeting")}>
                                Edit Your Available Time
                            </button>
                            <button className="button-clear-slots" onClick={clearAvailableSlots}>
                                End Session
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => navigate("/meeting/selectmeeting")}>
                            Start A Group Scheduling Session
                        </button>
                    )}
                </div>
                {selectedRange ? (
                    <div>
                        <button onClick={createMeeting}>Create Meeting</button>
                        <button onClick={clearSelection}>Cancel</button>
                    </div>
                    ) : (
                        <div className="button-placeholder"></div>
                )}
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
    );

}

export { WeeklyCalendar };
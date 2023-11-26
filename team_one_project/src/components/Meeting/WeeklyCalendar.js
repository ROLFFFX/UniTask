import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
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
        height: "100vh",
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
        marginTop:"50px"
    },
};

const WeeklyCalendar = () => {

    const { auth } = useAuth();

    const projectTitle = auth.selectedWorkspace;

    const [handleRefresh, setHandleRefresh] = useState([]);

    const calendarRef = useRef();

    const navigate = useNavigate();

    //get the start date
    const [startDate, setStartDate] = useState(new DayPilot.Date());

    //add the new meeting
    const handleNewMeeting = async () => {
        const titleResponse = await DayPilot.Modal.prompt("Title:", "");
        if (!titleResponse || titleResponse.canceled) return;
        const title = titleResponse.result;

        const startTimeResponse = await DayPilot.Modal.prompt("Start Time (YYYY-MM-DDTHH:MM):", "");
        if (!startTimeResponse || startTimeResponse.canceled) return;
        const startTime = new Date(startTimeResponse.result).toISOString();

        const endTimeResponse = await DayPilot.Modal.prompt("End Time (YYYY-MM-DDTHH:MM):", "");
        if (!endTimeResponse || endTimeResponse.canceled) return;
        const endTime = new Date(endTimeResponse.result).toISOString();

        try {
            const newMeeting = {
                id: 5,
                title: title,
                startTime: startTime,
                endTime: endTime
            };

            const response = await axios.post(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`
                , newMeeting, {
                headers: {
                    Authorization: `Bearer ${auth.user.userJWT}`,
                },
            });
            console.log('Meeting created:', response.data);
            console.log("response", response.status);
            //setHandleRefresh([...handleRefresh, newMeeting]); // Update state to trigger a refresh

            // New code: Custom confirmation prompt
            if (response.status === 201) { // not sure 200 or 201 Check if meeting creation was successful
                console.log('Meeting created:', response.data);
                setHandleRefresh([...handleRefresh, newMeeting]); // Update state to trigger a refresh

                // Show confirmation prompt
                DayPilot.Modal.confirm("Do you want to clear all the available time slots?")
                    .then(result => {
                        if (result.result) {
                            clearAvailableSlots(); // Call function to clear slots if "OK" is clicked
                        }
                        // If "Cancel" is clicked, do nothing
                    });
            }
            setHandleRefresh([...handleRefresh, newMeeting]); // Update state to trigger a refresh
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    //edit meeting
    const editEvent = async (e) => {
        // Prompt for new title
        const titleResponse = await DayPilot.Modal.prompt("New Title:", e.data.text);
        if (!titleResponse || titleResponse.canceled) return;
        const title = titleResponse.result;

        // Prompt for new start time
        const startTimeResponse = await DayPilot.Modal.prompt("New Start Time (YYYY-MM-DDTHH:MM):", e.data.start.toString("yyyy-MM-ddTHH:mm"));
        if (!startTimeResponse || startTimeResponse.canceled) return;
        const startTime = new Date(startTimeResponse.result).toISOString();

        // Prompt for new end time
        const endTimeResponse = await DayPilot.Modal.prompt("New End Time (YYYY-MM-DDTHH:MM):", e.data.end.toString("yyyy-MM-ddTHH:mm"));
        if (!endTimeResponse || endTimeResponse.canceled) return;
        const endTime = new Date(endTimeResponse.result).toISOString();

        try {
            const updatedMeeting = {
                meetingId: e.data.id, // Assuming this is how your event data is structured
                title: title,
                startTime: startTime,
                endTime: endTime
            };
            // Update request to the backend
            const response = await axios.put(`${ENDPOINT_URL}api/test/meeting/${projectTitle}`, updatedMeeting, {
                headers: {
                    Authorization: `Bearer ${auth.user.userJWT}`,
                },
            });

            //console.log('Meeting updated:', response.data);

            // Optionally, update the calendar with new event details
            const dp = calendarRef.current.control;
            e.data.text = title;
            e.data.start = new DayPilot.Date(startTime);
            e.data.end = new DayPilot.Date(endTime);
            dp.events.update(e);

            // Trigger state update if necessary
            setHandleRefresh([...handleRefresh]); // Adjust this based on how your state is managed
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


    // convert time slots to 30 mins duration
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
        const thirtyMinMeetings = convertTo30MinSlots(meetings);
        console.log("30mins", thirtyMinMeetings)
        const timeZoneOffset = getTimeZoneOffsetInHours();

        return thirtyMinMeetings.map(meeting => {
            let adjustedStartTime = new Date(meeting.start);
            adjustedStartTime.setHours(adjustedStartTime.getHours() - timeZoneOffset);

            let adjustedEndTime = new Date(meeting.end);
            adjustedEndTime.setHours(adjustedEndTime.getHours() - timeZoneOffset);

            return {
                start: new DayPilot.Date(adjustedStartTime),
                end: new DayPilot.Date(adjustedEndTime),
                cssClass: "calendar_default_event_inner"
            };
        });
    };

    //(AVALIABLE TIME SLOTS) Get meeting time slots
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

            return avaliableTimeSlots;
        } catch (error) {
            console.error('Error fetching avaliableTimeSlots:', error);
            return []; // Return an empty array in case of error
        }
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
                cssClass: "calendar_black_event_inner"
            };
        });
    };

    //(MEETING) Get meeting time slots
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

    // (COMBINE) Function to check if two time periods overlap
    const doTimesOverlap = (start1, end1, start2, end2) => {
        return start1 < end2 && start2 < end1;
    };

    // (COMBINE) Function to filter out available slots that conflict with meetings
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

    //Buttons for clear all avaliable time slots prompt
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
        try {
            // Make a request to your backend to delete all available time slots
            const response = await axios.delete(`${ENDPOINT_URL}api/test/timeslot/clearall/${projectTitle}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.userJWT}`,
                    },
                }
            );
            if (response.status === 200) { //not sure 200 or 201
                console.log('All available time slots cleared');
                // You may want to update your UI or state here as needed
            }
        } catch (error) {
            console.error('Error clearing available time slots:', error);
        }
    };

    //calendar default structure
    const [calendarConfig, setCalendarConfig] = useState({
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        startDate: startDate,

        // delete port implemented (Problem: newly created meeting can not be removed)
        contextMenu: new DayPilot.Menu({
            items: [
                {
                    text: "Delete",
                    onClick: async args => {
                        await deleteMeeting(args.source);
                    }
                },
                {
                    text: "Edit...",
                    onClick: async args => {
                        await editEvent(args.source);
                    }
                }
            ]
        })
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
            const [available, meetings] = await Promise.all([fetchAvaliable(), fetchMeetings()]);

            const processedAvailable = adjustTimeZoneAvaliable(available);
            const adjustedMeetings = adjustTimeZoneMeet(meetings);

            // Filter out conflicting slots
            const nonConflictingAvailable = filterConflictingSlots(processedAvailable, adjustedMeetings);

            // Combine non-conflicting available slots and meetings
            const combinedEvents = [...nonConflictingAvailable, ...adjustedMeetings];

            setCalendarConfig(prevConfig => ({
                ...prevConfig,
                events: combinedEvents,
                startDate: startDate
            }));
        };

        initializeCalendar();
    }, [startDate, handleRefresh]);

    return (
        <div style={styles.wrap}>
            <div className="week-navigation" style={styles.header}>
                <button className="button-prev" onClick={goToPreviousWeek}>
                    &lt; Previous Week
                </button>
                <button className="button-next" onClick={goToNextWeek}>
                    Next Week &gt;
                </button>
                <button className="button-new-meeting" onClick={handleNewMeeting}>
                  New Meeting
                </button>
                <button onClick={() => navigate("/meeting/selectmeeting")}>
                    Edit Meeting Time Slot
                </button>
                <button className="button-clear-slots" onClick={clearAvailableSlots}>
                    Clear All Available Time Slots
                </button>
            </div>
            <DayPilotCalendar
                key={calendarConfig.cellDuration}
                style={styles.calendar}
                {...calendarConfig}
                ref={calendarRef}
            />
        </div>
    );

}

export { WeeklyCalendar };

/**
 * @fileoverview This file contains the React components and logic for the SelectMeetingContent interface. 
 *               It includes functionality for displaying a weekly calendar, selecting available time slots, 
 *               navigating through weeks, and handling time slot selections. The components utilize Material-UI 
 *               Dialog for modals, and Axios for HTTP requests to a backend server. 
 *               The file also contains utility functions for date manipulation and formatting.
 */
import React, { useEffect, useState } from "react";
import "./SelectMeetingContent.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import useAuth from "../../hooks/useAuth";

/**
 * Calculates the date range (start and end date) of the current week based on a reference date.
 * 
 * @param {Date|string} referenceDate - The date to calculate the week range from. Can be a Date object or a string that can be parsed into a Date.
 * @returns {string} A string representing the start and end date of the week in the format "Month Day, Year - Month Day, Year".
 */
function getCurrentWeekDateRange(referenceDate) {
  const currentDate = new Date(referenceDate);
  const currentDay = currentDate.getDay();

  // Calculate start of the week (Monday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(
    currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
  );

  // Calculate end of the week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatOptions = { day: "numeric", month: "long", year: "numeric" };
  const startDateString = startOfWeek.toLocaleDateString(
    undefined,
    formatOptions
  );
  const endDateString = endOfWeek.toLocaleDateString(undefined, formatOptions);
  console.log(endDateString);

  return `${startDateString} - ${endDateString}`;
}

/**
 * React component that renders the main meeting container including the calendar for selecting available times, 
 * navigation buttons for week selection, and the list of selected times. It also includes modals for confirmation 
 * and failure messages.
 * 
 * State:
 * - @state @type referenceDate: Date object representing the current reference date for the week being viewed.
 * - @state @type fetchedSlots: Array of Date objects representing the time slots fetched from the server.
 * - @state @type newlySelectedSlots: Array of Date objects representing newly selected time slots that have not yet been sent to the server.
 * - @state @type selected: Boolean representing whether any time slots have been selected.
 * - @state @type isModalOpen: Boolean controlling the visibility of the success modal.
 * - @state @type isFailureModalOpen: Boolean controlling the visibility of the failure modal.
 * - @state @type failureMessage: String containing the message to be displayed in the failure modal.
 *
 * @returns {React.Component} The SelectMeetingContent component.
 */
export function SelectMeetingContent() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const dateRange = getCurrentWeekDateRange(referenceDate);
  const [fetchedSlots, setFetchedSlots] = useState([]);
  const [newlySelectedSlots, setNewlySelectedSlots] = useState([]);
  //const [refresh, setRefresh] = useState(false);

  const { auth } = useAuth();
  const projectTitle = auth.selectedWorkspace;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  //get time difference between the ISO string and the local time
  const getTimeZoneOffsetInHours = () => {
    // console.log("get time difference");
    const currentDateTime = new Date();
    const offsetInMinutes = currentDateTime.getTimezoneOffset();
    return offsetInMinutes / 60;
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

  const toSelectedRange = (slot) => {
    const startTime = new Date(slot.getTime());
    const endTime = new Date(slot.getTime() + 30 * 60 * 1000); // Add 30 minutes

    const startTDisplay = formatTimeForDisplay(startTime);
    const endTDisplay = formatTimeForDisplay(endTime);

    return startTDisplay + " - " + endTDisplay;
  };

  const deleteAllUserTimeSlots = async () => {
    try {
      //deleteAll that belongs to a user
      const response = await axios.delete(
        `${ENDPOINT_URL}api/test/timeslot/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );

      console.log("All time slots for the user have been deleted successfully");
      //Update the state to reflect the changes in the UI
      setFetchedSlots([]);
      setNewlySelectedSlots([]);
    } catch (error) {
      console.error("Error deleting user time slots:", error);
    }
    window.location.reload();
  };

  //whether the user has selected any available times
  const [selected, setSelected] = new useState(false);

  useEffect(() => {
    const fetchBookedTimeSlots = async () => {
      try {
        const response = await axios.get(
          `${ENDPOINT_URL}api/test/timeslot/${projectTitle}`,
          {
            //const response = await axios.get(`http://localhost:8080/api/test/timeslot/${projectTitle}`, {
            headers: {
              Authorization: `Bearer ${auth.user.userJWT}`,
            },
          }
        );

        // Assuming response data format is: [{ startTime: 'ISODateString', endTime: 'ISODateString' }]
        if (response.data.length !== 0) {
          setSelected(true);
          const bookedTimeSlots = response.data.map((booking) => {
            // Convert startTime to Date object
            return new Date(booking.startTime); // We only need the start time for displaying in the calendar
          });

          setFetchedSlots(bookedTimeSlots);
        }
      } catch (error) {
        console.error("Error fetching booked time slots:", error);
      }
    };

    fetchBookedTimeSlots();
  }, [referenceDate]); // Fetch data when component mounts and when referenceDate changes

  const toggleSlotSelection = (day, time) => {
    const startDate = new Date(referenceDate);

    // Convert day to number (0 = Monday, 6 = Sunday)
    const dayNumber = days.indexOf(day);

    // Parse time
    const [hours, minutes] = time.split(":").map(Number);

    // Set day and time on startDate
    startDate.setDate(
      startDate.getDate() -
        (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1) +
        dayNumber
    );
    startDate.setHours(hours, minutes, 0, 0);

    // Check if the slot is already booked (exists in fetchedSlots)
    const isAlreadyBooked = fetchedSlots.some(
      (slot) => slot.getTime() === startDate.getTime()
    );

    if (!isAlreadyBooked) {
      // Update newly selected slots if it's not already booked
      setNewlySelectedSlots((prevSlots) =>
        prevSlots.some((slot) => slot.getTime() === startDate.getTime())
          ? prevSlots.filter((slot) => slot.getTime() !== startDate.getTime())
          : [...prevSlots, startDate]
      );
    } else {
      setFailureMessage("This time slot is already selected");
      setIsFailureModalOpen(true);
      // Maybe show a message to the user that this slot is already booked
      console.log("This time slot is already booked.");
    }
  };

  const moveToPreviousWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() - 7);
    setReferenceDate(newDate);
  };
  const handleGoToMainCalendar = () => {
    // Navigate to the main calendar page route
    navigate("/meeting");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const moveToNextWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() + 7);
    setReferenceDate(newDate);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handleConfirmSelection = async () => {
    //送后端
    if (newlySelectedSlots.length === 0) {
      // No new slots were selected
      setFailureMessage("No new time slots were selected.");
      setIsFailureModalOpen(true);
      return; // Exit the function early
    }
    // Convert the newly selected time slots to UTC ISO strings and
    // create an object for each slot with startTime and endTime
    const newBookings = newlySelectedSlots.map((slot) => {
      const startTime = new Date(slot.getTime());
      const endTime = new Date(slot.getTime() + 30 * 60 * 1000); // Add 30 minutes

      return {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };
    });

    try {
      await axios.post(
        `${ENDPOINT_URL}api/test/timeslot/${projectTitle}`,
        newBookings,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      console.log("Booking successful!");

      // Update fetchedSlots with the newly selected slots
      setFetchedSlots((prev) => [...prev, ...newlySelectedSlots]);
      // Clear newly selected slots
      setNewlySelectedSlots([]);
      // Close the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error sending booking data to backend:", error);
    }
    window.location.reload();
  };

  return (
    <div className="mainMeetingContainer">
      <div className="calendar">
        <div className="upper">
          <div className="upper-left">
            <div>
              <h1>Select Your Available Times</h1>
            </div>
            <div className="actions">
              <button className="button-page" onClick={handleGoToMainCalendar}>
                Back To Group Schedule
              </button>
              <button
                className="button-delete"
                onClick={deleteAllUserTimeSlots}
              >
                Clear All My Selections
              </button>
              <button
                className="button-confirm"
                onClick={handleConfirmSelection}
              >
                Confirm Selection
              </button>
            </div>
          </div>
          <div className="upperright-list">
            <h3>Selected Times:</h3>
            <ul>
              {[...fetchedSlots, ...newlySelectedSlots].map((slot, index) => (
                <li key={index}>{toSelectedRange(slot)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lower">
          <div className="week-navigation-timeslots">
            <button className="button-prev" onClick={moveToPreviousWeek}>
              &lt; Previous Week
            </button>
            <h2>{dateRange}</h2>
            <button className="button-next" onClick={moveToNextWeek}>
              Next Week &gt;
            </button>
          </div>
          <div className="grid">
            <div className="headerRow">
              <div className="cell timeLabel"></div>
              {days.map((day) => (
                <div className="cell day" key={day}>
                  {day}
                </div>
              ))}
            </div>
            {times.map((time) => (
              <div className="row" key={time}>
                <div className="cell timeLabel">{time}</div>
                {days.map((day) => {
                  const startDate = new Date(referenceDate);
                  startDate.setDate(
                    referenceDate.getDate() -
                      (referenceDate.getDay() === 0
                        ? 6
                        : referenceDate.getDay() - 1)
                  );

                  const dayNumber = days.indexOf(day);
                  const [hours, minutes] = time.split(":").map(Number);
                  startDate.setDate(startDate.getDate() + dayNumber);
                  startDate.setHours(hours, minutes, 0, 0);

                  const slotKey = startDate.getTime();
                  const isSelected = [
                    ...fetchedSlots,
                    ...newlySelectedSlots,
                  ].some((slot) => slot.getTime() === slotKey);

                  return (
                    <button
                      aria-label={`Select ${time} on ${day}`}
                      className={`cell timeSlot ${
                        isSelected ? "selected" : ""
                      }`}
                      key={day}
                      onClick={() => toggleSlotSelection(day, time)}
                    ></button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Selection Confirmed</DialogTitle>
        <DialogContent>
          <p>Your time slots have been successfully selected.</p>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
      >
        <DialogTitle>Selection Failed</DialogTitle>
        <DialogContent>
          <p>{failureMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFailureModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

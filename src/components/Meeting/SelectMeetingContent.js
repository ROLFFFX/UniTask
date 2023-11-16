import React, { useState } from "react";
import "./SelectMeetingContent.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";  // Make sure you have react-router-dom installed

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

  return `${startDateString} - ${endDateString}`;
}

export function SelectMeetingContent() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const dateRange = getCurrentWeekDateRange(referenceDate);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlotSelection = (day, time) => {
    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - (referenceDate.getDay() === 0 ? 6 : referenceDate.getDay() - 1));
    const slotKey = `${startDate.toISOString().slice(0, 10)}-${day}-${time}`;
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slotKey)
        ? prevSlots.filter((slot) => slot !== slotKey)
        : [...prevSlots, slotKey]
    );
  };

  const moveToPreviousWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() - 7);
    setReferenceDate(newDate);
  };

  const moveToNextWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() + 7);
    setReferenceDate(newDate);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmSelection = () => {
    console.log("Confirmed slots:", selectedSlots);
    setIsModalOpen(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  const handleGoBackToWeeklyCalendar = () => {
    // Navigate to the route where your weekly calendar is located
    navigate("/meeting");
  };
  return (
    <div className="mainMeetingContainer">
      <div className="calendar">
        <h1>Select Time Slot</h1>
        <div className="week-navigation">
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
                startDate.setDate(referenceDate.getDate() - (referenceDate.getDay() === 0 ? 6 : referenceDate.getDay() - 1));
                const slotKey = `${startDate.toISOString().slice(0, 10)}-${day}-${time}`;
                return (
                  <button
                    aria-label={`Select ${time} on ${day}`}
                    className={`cell timeSlot ${
                        selectedSlots.includes(slotKey) ? "selected" : ""
                    }`}
                    key={day}
                    onClick={() => toggleSlotSelection(day, time)}
                  ></button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="selectedSlots">
          <h3>Selected Times:</h3>
          <ul>
            {selectedSlots.map((slot) => (
              <li key={slot}>{slot.replace("-", " at ")}</li>
            ))}
          </ul>
        </div>
        <div className="actions">
          <button className="button-clear" onClick={() => setSelectedSlots([])}>
            Clear Selection
          </button>
          <button className="button-confirm" onClick={handleConfirmSelection}>
            Confirm Selection
          </button>
        </div>
      </div>
  
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Selection Confirmed</DialogTitle>
        <DialogContent>
          <p>Your time slots have been successfully selected.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoBackToWeeklyCalendar}>Go Back to Weekly Calendar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  

}
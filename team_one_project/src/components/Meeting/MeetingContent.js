import React, { useState } from "react";
import "./MainMeeting.css";

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

export function MeetingContent() {
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
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlotSelection = (day, time) => {
    const slotKey = `${day}-${time}`;
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

  return (
    <div className="container">
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
              {days.map((day) => (
                <button
                  aria-label={`Select ${time} on ${day}`}
                  className={`cell timeSlot ${
                    selectedSlots.includes(`${day}-${time}`) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => toggleSlotSelection(day, time)}
                ></button>
              ))}
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
          <button
            className="button-confirm"
            onClick={() => console.log("Confirmed slots:", selectedSlots)}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}

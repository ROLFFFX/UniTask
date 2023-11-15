import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import './WeeklyCalendar.css';  
import { useNavigate } from "react-router-dom";


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

  
  const WeeklyCalendar  = () => {
    const calendarRef = useRef()

    const navigate = useNavigate();
  
    const editEvent = async (e) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
      if (!modal.result) { return; }
      e.data.text = modal.result;
      dp.events.update(e);
    };

    const [startDate, setStartDate] = useState(new DayPilot.Date());
  
    const [calendarConfig, setCalendarConfig] = useState({
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      startDate: startDate, 
      onTimeRangeSelected: async args => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      onEventClick: async args => {
        await editEvent(args.e);
      },
      contextMenu: new DayPilot.Menu({
        items: [
          {
            text: "Delete",
            onClick: async args => {
              const dp = calendarRef.current.control;
              dp.events.remove(args.source);
            },
          },
          {
            text: "-"
          },
          {
            text: "Edit...",
            onClick: async args => {
              await editEvent(args.source);
            }
          }
        ]
      }),
      onBeforeEventRender: args => {
        args.data.areas = [
          {
            top: 3,
            right: 3,
            width: 20,
            height: 20,
            symbol: "icons/daypilot.svg#minichevron-down-2",
            fontColor: "#fff",
            toolTip: "Show context menu",
            action: "ContextMenu",
          },
          {
            top: 3,
            right: 25,
            width: 20,
            height: 20,
            symbol: "icons/daypilot.svg#x-circle",
            fontColor: "#fff",
            action: "None",
            toolTip: "Delete event",
            onClick: async args => {
              const dp = calendarRef.current.control;
              dp.events.remove(args.source);
            }
          }
        ];
  
  
        const participants = args.data.participants;
        if (participants > 0) {
          // show one icon for each participant
          for (let i = 0; i < participants; i++) {
            args.data.areas.push({
              bottom: 5,
              right: 5 + i * 30,
              width: 24,
              height: 24,
              action: "None",
              image: `https://picsum.photos/24/24?random=${i}`,
              style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
            });
          }
        }
      }
    });

    const goToPreviousWeek = () => {
        setStartDate(startDate.addDays(-7));
    };

    const goToNextWeek = () => {
        setStartDate(startDate.addDays(7));
    };

    useEffect(() => {
        setCalendarConfig((prevConfig) => ({
            ...prevConfig,
            startDate: startDate
        }));
    }, [startDate]);
  
    return (
        <div style={styles.wrap}>
          <div style={styles.header}>
              <button onClick={goToPreviousWeek}>&lt; Previous Week</button>
              <button onClick={goToNextWeek}>Next Week &gt;</button>
              <button onClick={() => navigate("/meeting/selectmeeting")}>Edit Meeting Time Slot</button>
          </div>
          <DayPilotCalendar
              style={styles.calendar}
              {...calendarConfig}
              ref={calendarRef}
          />
        </div>
      );
  }
  
  export { WeeklyCalendar };
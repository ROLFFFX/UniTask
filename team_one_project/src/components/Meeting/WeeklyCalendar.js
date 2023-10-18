import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import './WeeklyCalendar.css';  

class WeeklyCalendar extends Component {
    constructor(props){
        super(props);
        this.state = {
          viewType: "Week",
          durationBarVisible: false,
          timeRangeSelectedHandling: "Enabled",
          onTimeRangeSelected: async (args) => {
              const dp = this.calendar;
              const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
              dp.clearSelection();
              if (!modal.result) { return; }
              dp.events.add(new DayPilot.Event({
                  start: args.start,
                  end: args.end,
                  id: DayPilot.guid(),
                  text: modal.result
              }));
          },
        };
    }

    componentDidMount(){
        if (this.calendar && this.calendar.navigator) {
            this.calendar.navigator.onTimeRangeSelected = args => {
                this.calendar.update({startDate: args.day});
                this.calendar.navigator.select(args.day);
            };
        }
    }
    

    render(){
        var {...config} = this.state;
        return (
            <div>
                <div style={{left: "100px", top: "50px", width: "100%"}}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={3}
                        skipMonths={3}
                        onTimeRangeSelected={args => {
                            this.setState({
                              startDate: args.day
                            });
                        }}
                    />
                </div>
                <div style={{left: "100px", top: "300px"}}>
                    <DayPilotCalendar {...config} ref={component => { this.calendar = component && component.control; }}/>
                </div>
            </div>
        );
    }
}

export { WeeklyCalendar };

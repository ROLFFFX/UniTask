import { Container } from "@mui/material";
import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory";

export function BurndownChart() {
  const group_1 = [
    { sprint: 1, task: 7 },
    { sprint: 2, task: 8 },
    { sprint: 3, task: 5 },
    { sprint: 4, task: 4 },
  ];
  const group_2 = [
    { sprint: 1, task: 11 },
    { sprint: 2, task: 10 },
    { sprint: 3, task: 9 },
    { sprint: 4, task: 8 },
  ];
  const group_3 = [
    { sprint: 1, task: 15 },
    { sprint: 2, task: 12 },
    { sprint: 3, task: 14 },
    { sprint: 4, task: 13 },
  ];
  const group_4 = [
    { sprint: 1, task: 12 },
    { sprint: 2, task: 11 },
    { sprint: 3, task: 19 },
    { sprint: 4, task: 13 },
  ];
  return (
    <React.Fragment>
      <Container>
        <div style={{ marginLeft: "160px" }}>
          <h2
            style={{
              marginBottom: -25,
              fontFamily: "Poppins",
              fontSize: 16,
            }}
          >
            Burndown Chart
          </h2>
        </div>
      </Container>
      <VictoryChart domainPadding={20} theme={VictoryTheme.grayscale}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Sprint #1", "Sprint #2", "Sprint #3", "Sprint #4"]}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />
        <VictoryStack colorScale={"blue"}>
          <VictoryBar data={group_1} x="sprint" y="task" />
          <VictoryBar data={group_2} x="sprint" y="task" />
          <VictoryBar data={group_3} x="sprint" y="task" />
          <VictoryBar data={group_4} x="sprint" y="task" />
        </VictoryStack>
      </VictoryChart>
    </React.Fragment>
  );
}

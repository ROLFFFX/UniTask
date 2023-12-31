# Front End Documentation

## 1. Introduction

The entire frontend source code can be found in ./team_one_project from the root directory of this github repository. The general purpose of this frontend is to provide a user interface for users to interact with our web-app.

Main Version:<br/>
node v16.20.0 <br/>
npm v8.19.4<br/>
More detailed onboarding instruction can be found in OnBoarding Process.

> [!IMPORTANT]
> The detailed technical JSDoc for this project is here: [unitask frontend documentation](https://unitask-frontend-docs.netlify.app/)
> which contains more detailed implementation of each function.

## 2. Architecture Overview

UniTask’s front end has a traditional architecture of a React project. Let’s first have a quick runthrough on the folder structure:

```bash
./team_one_project
├── package-lock.json
├── package.json
├── public
└── src
```

#### public:

public folder contains static files and assets.
-- index.html : home page of entire front end. Root of front end. Can be ignored.
-- manifest.json : information about the project in a JSON file. Can be ignored.

#### package.json & package-lock.json:

these two files contains information of all dependencies used for the front end of UniTask. **Content of these two files should not be modified**

#### src:

src folder contains the source code of components of UniTask. It will be explained in detail in next section.

## 3. Component Documentation

In this section, I will explain the components in detail.

##### Files:

-- App.css (file): global css file for styling.
-- App.test.js (file): simple unit test for the `App` component.
-- reportWebVitals.js (file): performance testings.
-- setupTests.js (file): test configurations.
-- index.js (file): the entry point where the React app is initialized and rendered into the DOM.
-- App.js (file): Routers.

##### Folders:

-- components: source code for each components, actual meat of front end.
-- context: context providers.
-- hooks: custom hooks, mostly are global states.
-- images: static assets of images, svgs and icons.

### Details in components folder

Since components folder contains the entire source code for our front end, I will elaborate on the three most important folders.

#### hooks

Hooks folder contains two custom hooks.

-- useAuth.js: `useAuth` hook is used everywhere an API call is used. It utilizes context API provided by React to achieve the management of global state. More specifically, it controls the global `auth` state which stores the `userEmail, userJWT`, and some config info such as currently registered workspace.

-- useConfig.js: useConfig is not technically a hook. It stores the `base endpoint url` for our back end for both local and deployed version. It exists simply to save the pain for replacing every endpoint url in request calls during deployment.

---

#### context

context folder contains AuthProvider that handles the authentication and authorization logic.

AuthProvider.js: creates an authentication context for a React application using React's Context API and `react-cookie` for cookie management.

---

#### components

components folder contains the entire source code for all pages on front end.

```bash
.
├── Account
├── Dashboard
├── LoginPage
├── ManageTeam
├── Meeting
├── PageNotFound
├── Review
├── Setting
├── SprintBoard
└── Utilities
```
----
#### Folders within components:

##### Account

```bash
.
├── MainAccount.js
└── UserProfile.js
```

MainAccount - A functional component that renders the user profile page. This component uses MUI's Grid system to create a layout for the main accounnt page. It includes a UserProfile Component centered in the middle of page. The layout is adjusted to have a left margin of 200px to save space for left side bar. The Grid system is used to divide the page into three columns. The UserProfile component is placed in the middle column, taking up half of the grid's width. The other two columns serve as padding or spacing around the UserProfile component. Note: - This component does not accept any props. The content of profile page is defined in ./UserProfile.js

UserProfile - A functional component for displaying user profile information. This component renders a user's profile information, including username, email, and group information. It utilizes MUI's Box, Typography, Divider, and Button components for styling and layout. Icons from MUI are used to visually represent different sections of the profile, such as email and group information. The component also includes two buttons to change the workspace or log-out with current account.

##### Dashbaord

```bash
.
├── AnimatedProgressBar.js
├── BurndownChart.js
├── DashboardContent.js
├── DataVisualization.js
├── HorizontalBarChart.js
├── MainDashboard.js
├── PersonalChart.js
├── ProgressBar.js
├── TaskList.css
├── TaskList.js
├── TaskView.js
├── TeamProgress.js
└── VisualCharts.js
```

**AnimatedProgressBar** - A functional component that renders a circular progress bar of task points done / (task poitns for todo + task points for doing + taskpoints for done). This component takes progress data as a prop and uses it to calculate and display the completion percentage of a task or set of tasks. It uses VictoryPie and VictoryAnimation from the Victory charting library to render the progress bar, and MUI components for layout and tooltips.

**BurndownChart** - A functional component for rendering a burndown chart. This component takes processed data as a prop and renders a burndown chart that shows the progression of tasks over time. The chart is interactive, allowing users to zoom and brush over the data. It also dynamically adjusts to the window size.

**DashboardContent** - A functional component that renders the left side dashboard view of the dashboard. This component fetches and displays data regarding task distribution among team members, overall progress of tasks, team member information, and all tasks in the current workspace. It conditionally renders two different views based on the available data, which are table task view and dashboard view

**DataVisualization** - A functional component for rendering data visualizations. This component displays visual charts and provides an interactive dropdown menu to toggle between different views of task data. It is designed to offer an insightful and interactive representation of tasks in a project management setting. Group Progression on top, Personal Progression at bottom.

**HorizontalBarChart** - A functional component for rendering a horizontal bar chart. This component takes progress data and visualizes it as horizontal bars. It displays the proportion of tasks in different states (To Do, Doing, Done) as a percentage of the total number of tasks. The component utilizes tooltips to provide additional information on hover.

**MainDashboard** - entrypoint for entire dashboard page.

**PersonalChart** - A functional component for rendering a personal task progression chart. This component visualizes a user's task progression over time using a line chart. It allows users to interactively select different interpolation methods for the chart. The component also calculates and sets up the chart's size based on the window size and updates it on window resize. Ideally, user will choose their interpolation according to preference. However, we all know nobody is really going to use it. I personally only use linear and natural. It also provides 'polar' options, which I don't even understand this mathmatical terms. The entire chart is provided by Victory.js

**ProgressBar** - A functional component for rendering a progress checker with toggleable views. This component displays a progress indicator, which can be toggled between a circular (animated) and a horizontal bar chart representation. It utilizes a custom styled switch (GreySwitch) for toggling between these views. The component takes ProgressBarData as its prop to render the appropriate progress visualization.

**TaskList** - A functional component for rendering a list of tasks and could filter by user. This component displays tasks in a table format, including details like title, status, assignee, task points, and dates. It handles data formatting and provides tooltips for displaying full task titles and assignee names(especially when item is truncated when too long). The component receives task data and formatted team member information through props. It also provides option to reformat the table, filter through selected username.

**TaskView** - A functional component for rendering a view of tasks with filter by username functionality. This component provides an interface for viewing tasks. It includes a dropdown menu for toggling between different views (Data Visualization, Table Task View) and an autocomplete field for filtering tasks by team members. The actual table is rendered through TaskList, which can be found in ./Tasklist.js

**TeamProgress** - A functional component for rendering the task distribution among team members. This component displays a pie chart (using VictoryPie) of task points achieved by each team member. It uses the CustomLabel component to display tooltips for each slice of the pie chart.

**VisualCharts** - A functional component for rendering burndown charts of task progress based on group / personal task contribution. This component displays two charts: one for overall task progress and another for personal task progress. It uses the BurndownChart(./BurndownChart.js) and PersonalChart(./PersonalChart.js) components to render these charts. The component processes task data and personal task data to format them appropriately for the charts.

##### LoginPage

```bash
.
├── ForgotPassword.js
├── LoginSignup.js
├── LoginStyling
│ ├── BottomSVG.js
│ ├── TopSVG.js
│ └── theme.js
├── LoginWithGroup
│ ├── CreateYourWorkspace.js
│ ├── LoginWithGroup.js
│ └── LoginWithWorkspace.js
├── OnBoarding
│ ├── OBLanding.js
│ └── Steps
│ ├── ChooseName.js
│ └── ChooseRole.js
├── PasswordInput.js
└── SignUp.js
```

**BottomSVG** - A functional component for rendering a custom SVG shape. The source data comes from shapedivier.app

**theme** - A custom theme configuration for MUI components.

**TopSVG** - A functional component for rendering a custom SVG shape. The source data comes from shapedivier.app

**CreateYourWorkspace** - A functional component for rendering a Card that prompts users to create or join a workspace. This component displays instructions and a button for users to create their own workspace. It is designed to guide new users who do not have an existing workspace or are awaiting an invitation to join one. Also, it uses React Router's useNavigate hook for handling navigation to the workspace creation page.

**LoginWithGroup** - A functional component for rendering the login interface with workspace options. The component uses a Grid layout from MUI to organize the content. Each option (create or join workspace) is presented in its grid item. The SVG components are positioned absolutely to appear as background decorations.

**LoginWithGroup** - A functional component for displaying a list of workspaces for user login, and redirects the user to dashboard page with chosen workspace. This component renders a list of workspaces that a user is part of, allowing them to select and log in to a specific workspace. It uses the react-window (FixedSizeList) component to render a large virtualized list of workspaces (with renderWorkspaceRow helper function rendering each workspace).

**ChooseName** - A functional component for inputting a workspace name. This component presents a user interface for entering the name of a new workspace. It consists of a text field where users can type the workspace name. Workspace name is then passed up to the parent component for better state management and final POST request..

**ChooseRole** - A functional component for selecting a user role. Second step in OBLanding stepper. This component provides a user interface for choosing a role within a team. It offers two options: 'Team Member' and 'Team Admin'. The 'Team Admin' role is described as having access to modify the status of team members, which has all control over the workspace.

**OBLanding** - A functional component for the onboarding process of new users. This component presents an interface for new users to create their first workspace and choose their role within it. It uses a step-by-step approach, utilizing MUI Stepper component to guide users through the process. The steps include choosing a workspace name and selecting a user role. Input values are managed through passdown props.

**LoginSignup** - A functional component for user login and auth. This component presents an interface for users to log in to the project. It includes input fields for email and password, and a submit button to initiate the login process. It also interacts with the server through API call to validate user credentials. On success, it navigates the user to root of protected routes; on failure, it display custom messages.

**PasswordInput** - A functional component for rendering a password input field with validation. This component provides an input textfield for password entry along with real-time validation feedback. It includes a progress bar to indicate the strength of the password based on its length and displays helper text to guide the user to meet the password criteria. The criteria include having a minimum length of 8, containing at least one numeral, and at least one uppercase letter.

**SignUp** - A functional component for registering new users. This component presents an interface for users to sign up their own account. It includes input fields for first name, last name, email, custom password field, and a submit button to initiate the registration process. The password input is customized and can be found in ./PasswordInput.js. It also interacts with server through API calls to register and uses custom modal to display success or error messages. Since we handle user authorization through a GET Request with JWT, it display a modal to prompt the user to click the link in email.

##### ManageTeam

```bash
.
├── InviteNewMemberModal.js
├── ManageTeam.js
└── ManageTeamContent.js
```

**InviteNewMemberModal** - A functional component for inviting new members to a workspace. This component presents an interface for users to invite new members to their workspace. It includes a text field for entering the email of the new member and a submit button to initiate the invitation process. It also displays custom success/failure messages to respond the status code return by server

**ManageTeam** - A functional component for fine tuning layout of ManageTeamContent. ManageTeamContent can be found in ./ManageTeamContent.js

**ManageTeamContent** - A functional component for displaying and managing team members. This component provides an interface for viewing the list of team members and managing them. It allows users to invite new members and remove existing ones. It fetches team member data from server API and displays it using react-window (FixedSizeList).

##### Meeting

```bash
.
├── MainMeeting.js
├── SelectMeeting.js
├── SelectMeetingContent.css
├── SelectMeetingContent.js
├── WeeklyCalendar.css
└── WeeklyCalendar.js
```

**SelectMeetingContent** - React component that renders the main meeting container including the calendar for selecting available times, navigation buttons for week selection, and the list of selected times. It also includes modals for confirmation and failure messages.

**WeeklyCalendar** - rendering an interactive weekly calendar. It includes features for creating, rescheduling, renaming,deleting events, and conducting a group availability poll. Axios is used for HTTP requests, and react-router-dom for navigation. The component also uses custom hooks for authentication and configuration management.

##### PageNotFound

```bash
.
└── PageNotFound.js
```

**PageNotFound** - A functional component for handling 404 page not found errors. However, in the deployed version, Page Not Found is internally handled by vercel.

##### Review

```bash
.
└── MainReview.js
```

**MainReview** - A functional component for managing reviews in a project management context. This component provides interfaces for adding new records, viewing existing records, modifying them, and deleting them. It handles all the necessary state and logic for CRUD operations on records. It also manages user interactions through modals and forms. It displays three cards, left one for a controller that renders and allows user to select records, the middle one is for displaying content, modifying content, and deleting content. The right one is for adding new content.

##### SpringBoard

```bash
.
├── MainSprintBoard.css
├── MainSprintBoard.js
├── MainSprintBoard_draft.js
└── Task.js
```

**MainSprintBoard** - A functional component for managing and visualizing tasks in a sprint. This component is responsible for displaying tasks categorized by their status (Not Started, To Do, Doing, Done) in a Kanban-style board. It allows users to create new tasks, update task status through drag-and-drop, and view task details. The component fetches task and team member data from an API and updates the UI accordingly. Each column should be populated by Task Objects, which is defined in Task.js

**Task** - A functional component for displaying and interacting with a task, and the manipulation of subtasks of this task. This component represents a single task, displaying its title, assignee, due date, points, and subtasks. It provides functionality to edit, delete, and add subtasks to the task. The component also includes modals and menus for these interactions and uses axios for API requests to will update the task data through the API endpoint.

##### Utilities

```bash
.
├── LogOutButton.js
├── PermanentDrawer.js
├── SwipeableCarouselWindow.js
├── TopNavBar.js
├── WelcomePage.js
└── barTheme.js
```

**LogOutButton** - A functional component providing a logout button. This component renders a button styled using MUI, with an icon indicating the logout action. Clicking the button triggers the logout function from the useAuth hook, which simply redirects the user to loginpage after clearing the global auth info. This button is currently placed in userprofile page. Another suitable place for it is under the left side bar.

**PermanentDrawer** - A functional component providing a sidebar navigation drawer. This component displays a permanent drawer on the left side of all pages in protected routes, offering navigation options to different parts of the application like Dashboard, Task Board, Meeting Schedule, etc. It maps navigation items to specific routes using react-router-dom's useNavigate hook.

**SwipeableCarouselWindow** - A functional component providing a swipeable carousel slider. This component is used for showcasing different features of the application like the interactive dashboard, task assignment system, meeting scheduling, report & review, and more. It uses react-slick for carousel functionality. Each slide contains an image, title, and descriptive content, and the actual content is predefined and mapped.

**TopAppBar** - A functional component providing the main navigation and utility bar. This component renders the top app bar of the application with logo, hyperlink drawer toggle, and change workspace and logout. It also contains logic to handle dynamic hyperlinks, allowing users to add, edit, and remove links with custom names.

**WelcomePage** - A functional component that renders the landing page of the UniTask application. This component displays a welcoming message, a brief introduction to UniTask, and a 'Get Started' button leading to the signup page. It also includes a swipeable carousel window that showcases various features of the application (./SwipeableCarouselWindow.js). The page incorporates custom animations for each components.

## 4. Routing

UniTask utilizes **react-router-dom v6.17.0** to achieve the routing functionality. The entire router setup can be found in App.js in src folder's root. The official documentation for react router dom can be found in: https://reactrouter.com/en/main.

## 5. API Integration

UniTask utilizes **axios v1.6.0** for API integration. It utilizes POST, PUT, DELETE, and GET requests. The endpoints documentation can be found in the backend documentation.
The official documentation for axios can be found in: https://axios-http.com/docs/intro.

## 6. Styling

UniTask intensively uses **MUI ecosystem** for UI Stylings, and the Dashboard content mostly uses **Victory.js v36.6.11** for the interactive charts. There is no global theme defined for Material-UI, however, you can find several customized theme for Login cycle, Nav Bar content, and Manage Workspace content in corresponding folders.
Versions of MUI ecosystems used: - mui/icons-material: v5.14.11 - mui/joy: v5.0.0-beta.11 - mui/material: v5.14.15
The official documentations for these libraries can be found in:
Material-UI: https://mui.com/material-ui/getting-started/
Material-Joy-UI: https://mui.com/joy-ui/getting-started/
Victory.js: https://formidable.com/open-source/victory/docs

## 7. Build and Deployment

UniTask Front End is entirely deployed through **vercel.app**. It is deployed automatically on a mirror repository: https://github.com/ROLFFFX/UniTask_Beta_Front
For **vercel.app**, you can find it in: https://vercel.com

The static site generated by JSDoc is deployed through **netlify.app**: https://www.netlify.com/

## 8. Documentation and Comments

UniTask Front End uses official JSDoc syntax for documentation and comments. The generated static site for our official documentation can be found here: https://unitask-frontend-docs.netlify.app/

## 9. Dependency Management


UniTask Front End utilizes multiple dependencies, and they are fully defined in package.json. To install all of them, you only have to run `npm i` in the root directory of team_one_project.
Here is a list of all dependencies used:
```bash
"@daypilot/daypilot-lite-javascript": "^3.18.0",
"@daypilot/daypilot-lite-react": "^3.18.0",
"@emotion/react": "^11.11.1",
"@emotion/styled": "^11.11.0",
"@material/drawer": "^14.0.0",
"@material/list": "^14.0.0",
"@mui/icons-material": "^5.14.11",
"@mui/joy": "^5.0.0-beta.11",
"@mui/material": "^5.14.15",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.6.0",
"bootstrap": "^5.3.2",
"cors": "^2.8.5",
"crypto-js": "^4.1.1",
"eslint": "8.22.0",
"mdb-react-ui-kit": "^6.3.0",
"react": "^18.2.0",
"react-cookie": "^6.1.1",
"react-dom": "^18.2.0",
"react-joyride": "^2.7.0",
"react-router-dom": "^6.17.0",
"react-scripts": "5.0.1",
"react-slick": "^0.29.0",
"react-spotlight-tour": "^1.1.0",
"react-virtualized-auto-sizer": "^1.0.20",
"react-virtuoso": "^4.6.2",
"react-window": "^1.8.9",
"slick-carousel": "^1.8.1",
"styled-components": "^6.0.8",
"uuid": "^9.0.1",
"victory": "^36.6.11",
"web-vitals": "^2.1.4"
```

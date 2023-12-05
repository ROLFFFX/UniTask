# UniTask

This is a project for CS 370 Software Engineering Practicum at Emory University.<br/>
Team Member: Alec Berger, Jingyu(Eula) Wang, Sichen Liu, Yuxuan(ROLF) Shi, Yinshu (Salina) Cai, Zhenyan(Francis) Li, Daniel He<br/>

---
# Index
1. [Introduction](#1-introduction)
   1. [Purpose](#purpose)
   2. [Target Audience](#target-audience)
   3. [Key Features](#key-features)
   4. [Production Log](#production-log)
3. [User Guide](#2-user-guide)
4. [Technical Documentation / Developer Guide](#3-technical-documentation--developer-guide)
   1. [Onboarding Process](#onboarding-process)
        1. [Installations](#1-installations)
        2. [Spinning Up Local Servers](#2-spinning-up-local-servers)
   2. [Front End Documentation](#front-end-documentation)
   3. [Back End Documentation](#back-end-documentation)
   4. [Deployment](#deployment)


---
# 1. Introduction

## Purpose
UniTask is a innovative web app tailored for university students to experience the agile methodology in action. UniTask transforms the way teams collaborate, plan, and execute projects with its intuitive, scrum-inspired design.

## Target Audience

UniTask is specifically tailored for university students and individuals who are new to or interested in agile methodologies. Its user-friendly interface and comprehensive feature set make it an ideal choice for academic projects in school and personal task management.

## Key Features

### Interactive Dashbaord
The dashboard is a central feature of UniTask, offering real-time visualization of various progress metrics. It displays group task progression, individual task status, task completion percentages, and the distribution of tasks among group members, and more.
This interactive and informative dashboard is crucial for tracking overall project health and individual contributions.

### Task Assignment System
UniTask's offers robust task assignment system, which incorporates a drag-and-drop functionality. This feature enhances the visualization and formalization of task assignments, making it effortless for users to manage and organize their work in group project. In addition, it allows users to deconstruct tasks into smaller, more manageable subtasks, facilitating a detailed and organized approach to task management.
The system also fosters cooperative work among team members, promoting a collaborative environment for project progression.

### Meeting Schedule Tool
This tool simplifies the process of scheduling meetings. Customized for university students, it enables users to start a poll and input their available time slots. The built-in algorithm then proposes optimal meeting times based on the collective availability of team members, easing the coordination of group meetings.

### Reflection and Review Page
UniTask includes a reflective review page where users can document and submit their progress reflections. This component encourages self-assessment and aids in personal and team development, ensuring continuous improvement in project management.

### Additional Features
UniTask is equipped with various other components designed to enhance user experience and project management efficiency.

## Production Log
The UniTask project is developed by Team One in 8 scrum iterations. The production log can be found here:
| Sprint | Date | Link to Sprint Review |
| -------|------|--------|
| 0 | 18th Sept | [Sprint 0](https://docs.google.com/presentation/d/1Egji9Zl4aP3YdsBXmURsihLaTb1vfJGryWwd2nxwH3o/edit?usp=sharing) |
| 1 | 25th Sept | [Sprint 1](https://docs.google.com/presentation/d/1cti873_JLC_ciak0w0uyxoPFXLwqMO9_HisdmpFQEW0/edit?usp=sharing) |
| 2 | 2nd Oct | [Sprint 2](https://docs.google.com/presentation/d/1bAWQiSEe12Wso1vX8AB5hwbMdrJ2Kf6A5U8DOfFZDY4/edit?usp=sharing) |
| 3 | 9th Oct | Fall Break |
| 4 | 16th Oct | [Sprint 3](https://docs.google.com/presentation/d/1R5yBMI0NuBwbEBThZDL_ITTJDL2oQV3-BzSGh1-8L3Q/edit?usp=sharing) |
| 5 | 23rd Oct | [Sprint 4](https://docs.google.com/presentation/d/1Um9sX-BJu6FUEYe5RTGCH_cdsyDcp4nvLykQGbi5dvU/edit?usp=sharing) |
| 6 | 30th Oct | [Sprint 5](https://docs.google.com/presentation/d/17OM73fd-ZMi0O-qJSLzxRtuBBDAVKBF5_6LV9rN_m5w/edit?usp=sharing) |
| 7 | 6th Nov | [Sprint 6](https://docs.google.com/presentation/d/1tWUtPxFw2KfBA21nrq0c6n3mMjC2yHEdhr9prLNDol8/edit?usp=sharing) |
| 8 | 13th Nov | [Sprint 7](https://docs.google.com/presentation/d/1mQ1yCL1uS9jNGVbMnRH4AMa3l2E4lpPz1Timh6wQVXQ/edit?usp=sharing) |
| 9 | 20th Nov | Thanksgiving Break |
| 10 | 27th Nov |[Sprint 8](https://docs.google.com/presentation/d/1Kg_Sx0qRTmgSgd7-NMn68o6-01klMHLoM7IiUz-JXTc/edit?usp=sharing)|

---
# 2. User Guide

**UniTask**

Team One CS 370

Welcome to **UniTask**

This documentation is meant to guide end-users through a walkthrough of the product.

## Index
1. [Overview](#overview)
   1. [Product Description](#product-description)
   2. [Outline of Features](#outline-of-features)
2. Onboarding
3. Workspace
4. [Dashboard](#dashboard)
   1. [Dashboard Overview](#dashboard-overview)
   2. [Views](#views)
   3. [Task Distribution and Progress](#task-distribution-and-progress)
5. [Task Board](#task-board)
   1. [Task Board Overview](#task-board-overview)
   2. [Tasks](#tasks)
6. [Meeting Schedule](#meeting-schedule)
   1. [Group Events Schedule](#group-events-schedule)
   2. [Group Availability](#group-availability)
7. [Report & Review](#report-&-review)
8. [Navbar](#navbar)

## OVERVIEW 

### Product Description

UniTask is a team-management application designed for college students working on a group project. Unlike most team management software, which is made for a professional environment, Unitask prioritizes students’needs by providing features specifically designed for an academic setting, while remaining simple enough for anyone to use without any professional experience.

### Outline of Features

To meet the needs of the average college student, UniTask provides the end-user with a number of features essential to academic group work. Broadly speaking, the main function of the application is to provide a team the ability to break down a project into an organized list of tasks to be completed. These tasks can be assigned to individual team members, and the team can then monitor the progress and due date of each task to keep the project on track. A number of supplemental features are provided to make UniTask an all-in-one workspace for everything a group project would need. The rest of the documentation will explain each feature in greater detail, but this outline will briefly describe the main functions:

1. Onboarding process: When a user first signs up, they are prompted to create a new project or join an existing project. Users can be members of multiple projects at the same time. Once a user has selected a project, the workspace will be created.
2. Dashboard: The front page of the project workspace is a read-only dashboard showing analytics regarding the project. Information displayed on the dashboard includes:
   1. Graphs to visualize data, such as percentage of completed tasks, a pie chart of team member contribution, and a line graph of tasks completed over time
   1. A list of all tasks, which shows the progress status of each task, who the tasks are assigned to, and the due date of each task
3. Task Board: A Scum-style three-column task board for organizing the tasks by status (“To Do”, “Doing”, and “Done”). This is where the user will create tasks for the project and track the progress of each work item.
4. Calendar: A scheduling tool to help team members find meeting times. Each user can fill in the hours they are free throughout the week, and the calendar will find times when everyone is free to meet.
5. Report &Review: A place to write periodic reviews of the group’s progress, especially for providing feedback on recent accomplishments.

## ONBOARDING

### Sign Up Process
We ask users to fill in their first name, last name, email address, and password. For security, passwords must fulfill our criteria. The “SIGN UP” button is not enabled until all fields are filled and all password criteria are met.<br/>
Once a user clicks “SIGN UP”, one of two pop-ups will show up depending on whether there is a sign up error. Sign up errors include the four scenarios specified in the “Sign Up Error” pop-up window.<br/>
If the email address is valid, once a user sign up, they will receive a confirmation email to the email address they registered with. As long as users click on the link within 15 minutes, it will take them to a page containing the below message, and the registration process is completed.<br/>

### Sign In Process
Similar to Sign Up, the “SIGN IN” button is disabled until user has filled out both fields. Upon failure, one of two customized pop up windows might show up:<br/>
1. If user has put in wrong combination of email & password, it will prompt bad credentials.<br/>
2. If user has signed up but hasn't confirmed the email through the link we send, it will prompt credentials are correct but account is currently disabled.<br/>

Once logged in, user can either choose to create a new workspace (project) or log into an existing workspace (project) they are in.

## WORKSPACE

### Overview
The Workspace serves as a public environment within Unitask where users can perform tasks, organize information, or collaborate with others. It acts as an individualized or team-specific space for users to work within the application.<br/>

### Create Workspace
Users need to have at least one workspace to use the app. If the list on their right is empty, they should proceed to click the button “Create Workspace” to establish their own workspace. If they are currently awaiting invitations from teammates to join their workspace, it is advised to refresh the page periodically.

### Log in to Workspace 
Once created, the workspace will be saved under the user’s account and they can login to it upon login.

### Manage Workspace(View, Add & Delete Members)
The Manage Workspace section allows the userto invite new team members through their registered emails, or remove them from the workspace.<br/>

Upon deletion, there will be a validation process and warning prompts. <br/>
1. If user is removing other team member, he will be warned with a custom pop up window.
2. If user is removing himself, he will be warned that he is exiting this workspace.
3. If user is removing himself while he is the last team member, he will be unable to do so since every workspace must contain at least one user.<br/>


After a user is being removed, his progress will be saved on both Dashbaord and Taskboard. He can also be invited and rejoin the workspace anytime.

## DASHBOARD 

### Dashboard Overview

The Dashboard is a data analytics tool to monitor progress on the project. Various graphs are automatically generated to visualize the completion status of tasks. The dashboard also includes a full list of all tasks, to provide a simple view of every work item in one place. <br/>
Once a user clicks “SIGN UP”, one of these two pop-ups will show up depending on whether there is a sign up error. Sign up errors include the four scenarios specified in the “Sign Up Error” pop-up below:

![image3](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/1a98eec0-dabe-49c6-a83f-ac9b2981783a)

### Views

The Dashboard can toggle between two different viewing modes. The “Data Visual” view shows graphs to visually portray progress on the project. The two line graphs shown in this view display the number of task points completed over time, so the team can monitor its productivity. The top graph shows tasks completed by the whole group, while the bottom graph shows tasks personally completed by the current user (note: this graph will look different for each team member). A scroll bar is provided to zoom in on smaller ranges of time. For the Personal Task graph, different interpolation options can be chosen to customize the style of the chart.

![image4](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/77c3af56-d4a0-4eee-a989-44521ee9aa5e)

The “Table Task” view switches to a linear list of all tasks, with information such as title, completion status, assignee, task points, and due date.

![image5](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/4d453a24-5e49-4256-8292-f6dcd7e573a5)

### Task Distribution and Progress

The Dashboard also includes a pie chart showing the proportion of task points completed by each team member. This helps teams make sure work on the progress is distributed evenly, and that each member is pulling their weight. When hovering the mouse over a section of the chart, a tooltip displays which team member is currently selected.

Below this pie chart, a progress bar calculates the percentage of completed task points out of total task points. This provides a simple way to quantify progress on the project.

![image6](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/3c4c3161-027b-4943-8a6e-b1170e65f812)

## TASK BOARD 

### Task Board Overview

The Task Board is a three-column, Scrum-style task board where users can create a list of work items to be completed in a project, and then organize these items into columns according to the progress made on each task. Each column of the board corresponds to one of three discrete completion statuses: To Do, Doing, or Done. Tasks can be moved across the board from left to right, until every task is eventually marked done, and the project is deemed complete.

![image7](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/9ba1f179-afe8-4398-b8db-8c7b187536d0)

### Tasks

A “Task” is simply any work item that must be completed during a project. It is up to the user how to break down their project into smaller parts, so what exactly counts as a task is fairly open-ended and largely depends on the nature of the project.

Tasks are designed to reflect the “divide and conquer” method typical of school group projects, where each team member is assigned to work on various small parts of the project. Each task is presented on notecard with information such as task Title, Assignee (the team member expected to complete the task), Due Date, and the number of “Task Points”, which designates the value or weight of the given task. Since some parts of a project are bound to be more labor-intensive than others, the point system is meant to quantify how much effort each task is worth. When calculating the overall progress on the project (see Progress Checker on the Dashboard), UniTask will calculate a proportion of completed task points, not the number of tasks themselves. If a user prefers to weigh all tasks evenly, they can simply ignore the task point feature and give all tasks a default weight of 1 task point.A task can also include a list of “subtasks”, which are displayed as a checklist of smaller items.

![image8](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/c6c0242e-da7b-44f2-8fdb-35468953aff8)

To create a new task, press the plus button on the left side of the page, next to the word Tasks. This will create a popup menu where all the fields of the task can be specified:

![image9](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/0078ecf0-c0bd-405c-9782-12d1e1837c6c)

Once submitted, this will create the Task card in the Tasks column:

![image10](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/2da6d269-3f16-4f00-ab82-42194a7f1a4a)

All newly created tasks will remain in the Task column, indicating that work on these items has not yet started. Each task card can be dragged and dropped into any of the three progress columns (To Do, Doing, Done)to track its completion status.

When hovering over a task, three buttons will appear in the upper right corner. The plus button can be used to add subtasks to the given task. These will appear as a checklist below the task title. Users may break down a task into as many subtasks as they’d like.

![image11](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/ec34ba60-9166-46ce-bc01-0fcc0a8f178b)

The chevron button to the left of the plus button is used to expand and collapse the subtask checklist for easier viewing. Clicking the ellipsis button will reveal options to edit or delete the task.

## MEETING SCHEDULE

The Weekly Calendar component is composed of two separate calendars. Namely, **Group Events Schedule** and **Select YourAvailable Times.**

### Group Events Schedule

The UniTask calendar is a dynamic interface that allows group members to **schedule meetings** efficiently based on **common availability**.

**Common Available Time Display**

![image12](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/96d0aeca-4d1d-46a4-9263-29c0107076ea)

Once all group members submit their available time slots through the '**Select YourAvailable Time**' feature, the backend system calculates the overlapping time slots. These **common available times** are displayed on the group events calendar in green. It represents the potential windows when all group members are free to meet.

**Selecting a Meeting Time**

![image13](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/8f13cfba-67fc-4421-aeb4-3ff0e323593a)

To schedule a meeting, a member selects a **specific time slot (purple)** within the common available times. This selection is then subject to group confirmation.

**Create a Meeting**

![image14](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/9ccb3b3b-230b-4e55-84d3-d58905d3f89a) ![image15](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/8b200a2e-d7b6-4b2d-824b-9cd790565420)

After confirming the time and duration for the meeting, the member can proceed to **create an event** by clicking the **"CREATEEVENT"**button located at the top of the calendar, which triggers

a prompt asking for the meeting's title. Once provided, clicking "OK" leads to a confirmation prompt that reaffirms the details of the new meeting, including its **title**, **start time**, and **end time**. Upon agreeing, the meeting is scheduled.

**Ending the Poll**

![image16](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/4987208e-8ba4-42ea-a7b6-1e9afc62d265) ![image17](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/e24b0d18-994a-431a-b2e4-0016a8d93fb4)

After the meeting is created, a user can choose to end the availability poll by clicking the **"End Poll"**button. This action clears all submitted available time slots from the calendar. Once the poll ends and the available time slots are cleared, the calendar **only** displays the **newly created meetings**, devoid of the green slots that represent common availability.

**Modifying an Event**

![image18](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/0115b19c-2e13-49a0-93cb-89eac4e7955d) ![image19](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/6bdd3324-360e-4ea0-81ff-0e0a712c6c2b)

Users can **modify the length** of an existing meeting by clicking, holding, and dragging the edges of the meeting block to **resize** it. The calendar will then prompt a confirmation message with the new meeting duration for the user to confirm.

![image20](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/cfb7a6be-1a65-4730-a3ab-52a8a083fcaf) ![image21](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/f36a5767-273e-40f0-a495-4ec6483fb6aa)

Similarly, the meeting can be moved to **anotherday ortime** by **dragging** the meeting block to the desired slot, with a confirmation prompt following this action as well.

**Event Management Options**

![image22](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/55f2e140-b09f-4fe9-bc8b-4afd4f3ffc16)

**Right-clicking** on a meeting block presents users with options to "**Delete**" or "**Rename**" the event. Selecting "Delete" removes the event from the calendar after confirmation, while "Rename"

allows the user to input a new title for the meeting.

### Group Availability

The **Select Your Available Times** is a user-friendly interface designed for scheduling and managing meeting time slots. It provides a visual calendar to select available times for meetings within a week.

**How to Use the Select Your Available Times Calendar**

1\.Click on **Start A Group Availability Poll** button. Once users click on it, a modal will pop up. It includes tips for the **Group Event** component. After reading the tips, users may proceed to poll.

![image23](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/d12e67d1-047d-4eab-88ef-6521429eabcf)

![image24](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/f7938b46-1b27-4b72-beb5-beaa9b95215b)

2\. Select Available Time Slots

Once users proceed to poll, they are directed to the **Select Your Available Time** calendar.

To access the Interface, ensure users are logged into their account, as the component integrates with user authentication.

![image25](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/8d6e6914-413a-492e-bc0e-e5b985b3dbb3)

Users can navigate the calendar. The interface displays the current week's date range at the top. Use the **Previous Week** and **Next Week** buttons to navigate through different weeks.

Users can view all available times as they are displayed in a grid format with days of the week and time intervals. To choose a time slot, users can click on any unselected time slot in the grid to choose it. Selected slots will be highlighted and added to your list of chosen times. Each slot has a range of **30 minutes.** The **Confirm Selection** button is used when users are ready to submit their selection. After users have confirmed their selection, they can review selected times

displayed under the **Selected Times** section in Eastern Standard Time (EST).

![image26](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/0ede2ef4-374f-489b-bbcc-efba7c4a1c33)

Users can clear their selections by clicking the **ClearAll My Selections** button. Clicking this button will remove all the current time slot selections. If an error occurs or a time slot is already booked, a notification will appear, informing you of the issue.

![image27](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/1bdb8f41-dcd9-496e-a98e-8e2d070fca49)

After users have confirmed their selection, they can click on the **Schedule New Events / Check Common Availability** button. This button allows users to schedule new events or check for common availability times within their group.

## REPORT&REVIEW

In the Report &Review page, users can write brief reports about the group’s progress. This can be used to log significant milestones in the project, and take notes on feedback or comments made about these accomplishments. Keeping records in this section is entirely optional, but this feature is perfect for long-term projects that might require reviewing periodic progress reports.

![image28](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/63cb2373-86dc-4aac-8ec7-ed7c7923e245)

## NAVBAR

The navbar on the top of the page has a few buttons to aid in project management. Besides buttons to log out and switch projects, the navbar also includes the Hyperlinks button.

### Hyperlinks

The main feature included in the navbar is the Hyperlinks tab. By clicking this button, users can embed hyperlinks directly into the project workspace. This allows users to save relevant resources for the project (Google drive, docs, Github, etc.)in one place for easy access.

![image29](https://github.com/ROLFFFX/CS_370_Team_One/assets/29384588/1e5d1486-4978-42f4-ac73-1f550951aec3)


---
# 3. Technical Documentation / Developer Guide
---
# Onboarding Process

## 1. Installations

### Front End

*1. Github Desktop*

- Please download [Github Desktop], which makes your life a lot easier. After you download it, sign in and clone our repo.
- Please make sure to clone instead of downloading the zip file.
- Please open up your github desktop again and click the "current branch" on the top sidebar. Create your own branch and
  select it.

*2. Node.js*

- Pull up your terminal, and type ```node -v``` (no quotation marks). If you are seeing "command not found" or versions lower than 16,
  please download node from nodejs.org
- Please make sure to click the green button on your left which says "18.18.0 LTS"
- Once you are done installing, pull up VSCode again and type ```node -v``` in the terminal. if you see "v18.18.0", we are good to go!

*3. npm, dependencies*

- In your terminal, cd to the folder "team_one_project". Make sure it's not our CS_370_TEAM_ONE folder, but "team_one_project"
  folder that's located inside of the CS_370_TEAM_ONE.
- type in "```npm install```". this will automatically install all dependencies/node modules according to the package.json.
- once you are done, most likely you will see stuff like "high severity vulnerabilities" and stuff. As long as it's not 2000 vulnerabilities,
  we are good to go.

*4.  Spin up the local server!*

- Open up VSCode and cd to our team_one_project_folder again, type in "```npm start```". This will spin up our local server on your default browser.
- If it does not automatically pop up a browser page for you, open a new chrome page and type in "localhost:3000".

*5. Following Updates*

Normally, ```npm install``` will do!

------------------------------------------------------------------------------------------------------------------------------------------------------
### Back End

*1. Install IntelliJ IDEA Ultimate version*
  - There’s a helpful [link](https://www.youtube.com/watch?v=U8qqNnBkjAs) that shows how you can use your student emails to get free license.


*2. IntelliJ Settings*
  - From the top bar, go to `Settings` -> `Build, Execution, Deployment` -> `Build Tools` -> `Maven`
  - Check for the maven homepath. This should be where your maven package stores.
  - Check your user setting file, it should be the address of your 'settings.xml' file, which is in your maven package -> conf, and select the override box.
  - Check the local repository, the path is where you create your repository in m2 locates, which should look like:
  - '/”where_you_put_your_m2_directory”/m2/repository' or the path you have for your repository
  - Then select the override box.

  - For Maven
  - we are using maven with version 3.6.3

  - For SDK
  - `File` -> `Project structure` -> `Project` and `Modules`
  - Check your SDK version, should be 17

------------------------------------------------------------------------------------------------------------------------------------------------------

### MySQL
Install MySQL
Download it from official website.
For Mac: https://www.youtube.com/watch?v=43-AjOT3Hfk
For Windows: https://www.youtube.com/watch?v=u96rVINbAUI
Set up your username and password following the guide.

------------------------------------------------------------------------------------------------------------------------------------------------------

### JDK & Maven
#### JDK
I think everyone have this, but you may want to check this link.
https://www.youtube.com/watch?v=43-AjOT3Hfk

#### Maven
I compared my settings with those on the youtube videos, I am not using the newest version of maven so I think this link should be helpful for macOS users.
https://www.youtube.com/watch?v=cbhCNjjvGOw&t=100s


And for windows,
https://www.youtube.com/watch?v=3EfvEZ_wThc
this one may work, but I am not able to check it myself.


You also need a local repository. To set it up,
Create a directory m2 at where you put your maven package
Create a directory called repository inside m2
Go to your setting.xml file, which is in apache-maven-x.x.x -> conf, 
After this part of code,


Add the line:
<localRepository>/Users/”your_user_name”/m2/repository</localRepository>

## 2. Spinning Up Local Servers
To fully enter development environment, we need to spin up servers for both React Front End and Spring Boot Back End. The MySQL database & SMTP Server is already hosted, so we don't have to worry about them.
### Front End
1. After everything is installed, open up project VSCode. Change directory to the root of team_one_project. (`cd team_one_project` at root directory of cloned repo folder)
2. `npm i` to install all dependencies.
3. `npm start` and open `http://localhost:3000/` in browser.

### Back End

---
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

---
# Back End Documentation
The entire backend implementation is in the "unitask" folder. This
documentation includes a thorough run through of this folder structure
and the functions of each file.

The backend implementation is done in the MacOs system. The code has
been run on a Windows system for the test purpose. The implementation
hasn't been run and tested on any other system.

> [!IMPORTANT]
> The detailed technical JavaDoc for this project is here: [unitask backend documentation](https://unitask-backend-docs.netlify.app/)
> which contains more detailed implementation of each function.


**Versions:**

Spring boot: 2.7.16

Maven: 3.6.3

JDK: 17

**Tools:**

IntelliJ IDEA Ultimate.

MySQL Workbench for tables viewing.

Postman for APIs testing.

1.  **.mvn/wrapper**

the .mvn/wrapper folder contains the Maven Wrapper files. The Maven
Wrapper is a way to ensure that the correct version of Apache Maven is
used to build a project, regardless of whether the developer has Maven
installed locally.

1.  **maven-wrapper.jar**

This is the JAR file that contains the Maven Wrapper code. It\'s a small
JAR file that includes the logic needed to download the specified
version of Maven if it\'s not already installed.

2.  **maven-wrapper.properties**

This properties file specifies the Maven version that should be used by
the wrapper. It contains a property like distributionUrl, which points
to the Maven distribution to be downloaded.

2.  **src**

**2.1 main**

the src/main directory structure is a convention used by Maven and other
build tools to organize the source code of the application. The src/main
directory is part of the standard Maven project structure and is used to
separate the main source code of the application from other resources
and configurations.

**2.1.1 java/com/teamone/unitask**

This directory contains the main Java source code of the Spring Boot
application. All the Java classes, packages, and code related to the
main functionality of the application are placed here.

The detailed explanation for all the classes and functions are in this
link:

<https://unitask-backend-docs.netlify.app/>

**2.1.2 resources**

the src/main/resources directory is a standard Maven project structure
that is used to store non-Java resources.

**2.1.2.1 application.yml**

This file is a YAML-formatted configuration file that is commonly used
in Spring Boot applications to define various settings and properties.

This file configures the database connection and its properties, the
application properties for the spring security implementation, and the
mail service settings.

-   Server Configuration

> Error Handling Configuration:
>
> include-message: Set to \"always\" to include error messages in error
> responses.
>
> include-binding-errors: Set to \"always\" to include binding errors in
> error responses.

-   Spring Data JPA Configuration

> JPA and DataSource Configuration:
>
> hibernate.ddl-auto: Specifies the database schema update strategy.
>
> datasource: Configures the MySQL database connection details.

-   Mail Configuration:

> Configures the SMTP server details for sending emails.

-   MVC and CORS Configuration

> Configures Cross-Origin Resource Sharing (CORS) for MVC endpoints.

-   Jackson Serialization Configuration

> Configures Jackson serialization settings, such as handling empty
> beans and default property inclusion.

-   Custom Application Properties

> Defines custom application properties such as JWT secret and
> expiration time.

The database used for this project is a MySQL database created on the
Microsoft Azure service.

2.1.2.2 static and template folder

These two folders come with the spring intializr and are not used in
this project.

2.  **Test**

The src/test folder is commonly used to store test source code and
resources.

3.  **.gitignore**

the .gitignore file is used to specify files and directories that should
be ignored by Git, the version control system.

4.  **mvnw and mvnw.cmd**

The mvnw script, along with the associated mvnw.cmd for Windows, is part
of the Maven Wrapper mechanism. The Maven Wrapper is a convenient way to
ensure that the build tool Maven is included with your project and is
used consistently across different environments, regardless of whether
Maven is installed locally.

5.  **pom.xml**

This file configures all the dependencies used for the backend
implementation.

A full list of dependencies used are listed here:

-   Spring Boot Starter Data JPA

-   Spring Boot Starter Mail

-   Spring Boot Starter Security

-   Spring Boot Starter Web

-   Spring Boot Starter Validation

-   Jackson Databind

-   Java JWT (JSON Web Token) API

-   Java JWT Implementation

-   Java JWT Jackson Integration

-   MySQL Connector/J

-   Project Lombok

-   Spring Boot Starter Test

-   Spring Security Test

6.  **system.properties**

This file is for the backend deployment use. It configures the version
of java JDK this backend implementation is using. For this
implementation, the java version used is 17.

--
# Deployment
UniTask project is deployed on both [vercel](vercel.app)(front end) and [heroku](heroku.com)(back end).<br/>
The deployed version of code can be found in these two repositories: <br/>
[Deployed Front End Repo](https://github.com/ROLFFFX/UniTask_Beta_Front)<br/>
[Deployed Back End Repo](https://github.com/SichenLiu111/unitask_impl)

MySQL Database and SMTP server is already hosted on [Azure MySQL Database](https://azure.microsoft.com/en-us/products/mysql/) and [Gmail SMTP Server](https://support.google.com/a/answer/2956491?hl=en).

For configuration settings such as password to access these accounts, please contact: yshi373@emory.edu

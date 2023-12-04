# UniTask

This is a project for CS 370 Software Engineering Practicum.<br/>
Team Name: Team One<br/>
Team Member: Alec Berger, Jingyu(Eula) Wang, Sichen Liu, Yuxuan(ROLF) Shi, Yinshu (Salina) Cai, Zhenyan(Francis) Li, Daniel He<br/>

---
# Index
1. [Introduction](#-1.-Introduction)
2. [User Guide](#-2.-User-Guide
)
3. Technical Documentation / Developer Guide
   1. [Front End Documentation](doc/frontend/README.md)
   2. [Back End Documentation](doc/backend/README.md)



---
# 1. Introduction
Introduction here

# 2. User Guide
User Guide here

# 3. Technical Documentation / Developer Guide
Technical Documentation here

# Technical Documentation
Greetings. This is the technical documentation for UniTask Project.


## Folder Structure
UniTask operates on a Decoupled Architecture, with separated Front End and Back End. In this chapter, we will explain where you can locate each file.

----
### Front End
The entire **front end folder** lives in the team_one_project at project root. The folder has a traditional React project structure. Let's first have a quick runthrough:

----
#### public
public folder contains static files and assets.
	-- index.html : home page of entire front end. Root of front end. Can be ignored.
	-- manifest.json : information about the project in a JSON file. Can be ignored.
	
----
#### package.json & package-lock.json
these two files contains information of all dependencies used for the front end of UniTask. **Content of these two files should not be modified**

----
#### src
src folder contains the source code of entire front end of UniTask. 
##### Files:
--	App.css (file): global css file for styling.
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

## Details in src folder
Since src folder contains the entire source code for our front end, I will elaborate on the three most important folders.

### hooks
Hooks folder contains two custom hooks.

-- useAuth.js: ``useAuth`` hook is used everywhere an API call is used. It utilizes context API provided by React to achieve the management of global state. More specifically, it controls the global ``auth`` state which stores the ``userEmail, userJWT``, and some config info such as currently registered workspace.

-- useConfig.js: useConfig is not technically a hook. It stores the ``base endpoint url`` for our back end for both local and deployed version. It exists simply to save the pain for replacing every endpoint url in request calls during deployment.

----
### context
context folder contains AuthProvider that handles the authentication and authorization logic.

AuthProvider.js: creates an authentication context for a React application using React's Context API and `react-cookie` for cookie management

----
### components

---

# Onboarding Process!

## React.js

*1. Github Desktop*

- Please download [Github Desktop], which makes your life a lot easier. After you downloaded it, sign in and clone our repo.
- Please make sure to clone instead of downloading the zip file. Cloning ensures the connection between your local file and
  our repo on github.
- Please open up your github desktop again and click the "current branch" on the top sidebar. Create your own branch and
  select it.

*2. Node.js*

- Pull up your terminal, and type ```node -v``` (no quotation marks). If you are seeing "command not found" or versions lower than 16,
  please download node from nodejs.org
- Please make sure to click the green button on your left which says "18.18.0 LTS"
- Once you are done installing, pull up VSCode again and type ```node -v``` in the terminal. if you see "v18.18.0", we are good to go!

*3. NPM, dependencies*

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

If not, find exact pkg that's giving you squiggly and run following command accordingly.
- for MUI
  - ```npm install @mui/material```
  - ```npm install @mui/icons-material```
-for react-router-dom
  - ```npm install --save react-router-dom```

------------------------------------------------------------------------------------------------------------------------------------------------------
## IntelliJ IDEA
*1. Install IntelliJ IDEA Ultimate version*
  - There’s a helpful [link](https://www.youtube.com/watch?v=U8qqNnBkjAs) that shows how you can use your student emails to get free license.


*2. IntelliJ Settings*
  - From the top bar, go to `Settings` -> `Build, Execution, Deployment` -> `Build Tools` -> `Maven`
  - Check for the maven homepath. This should be where your maven package stores.
  - Check your user setting file, it should be the address of your 'settings.xml' file, which is in your maven package -> conf, and select the override box.
  - Check the local repository, the path is where you create your repository in m2 locates, which should look like:
  - '/”where_you_put_your_m2_directory”/m2/repository'
  - Then select the override box.

  - For Maven
  - we are using maven with version 3.6.3

  - For SDK
  - `File` -> `Project structure`
  - Check your SDK version, should be 17

------------------------------------------------------------------------------------------------------------------------------------------------------

## MySQL
Install MySQL
Download it from official website.
For Mac: https://www.youtube.com/watch?v=43-AjOT3Hfk
For Windows: https://www.youtube.com/watch?v=u96rVINbAUI
Set up your username and password following the guide.

------------------------------------------------------------------------------------------------------------------------------------------------------

## JDK & Maven
### JDK
I think everyone have this, but you may want to check this link.
https://www.youtube.com/watch?v=43-AjOT3Hfk

### Maven
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



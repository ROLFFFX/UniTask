# CS_370_Team_One

This is a project for CS 370 Software Engineering Practicum

Team Name: Team One

Team Member: Alec Berger, Eula Wang, Sichen Liu, Yuxuan(ROLF) Shi, Yinshu (Salina) Cai, Zhenyan(Francis) Li, Daniel He

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
  - Go to: `Compiler` -> `Java Compiler`
  - Check your java version. It should be 1.8

  - For SDK
  - `File` -> `Project structure`
  - Check your SDK version, should be 1.8, and language level is `8 - lambdas`

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



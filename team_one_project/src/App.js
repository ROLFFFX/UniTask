/**
 * @fileoverview Routers Set Up. Entry point of entire frontend.
 */

import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { MainAccount } from "./components/Account/MainAccount";
import { MainDashboard } from "./components/Dashboard/MainDashboard";
import { LoginSignup } from "./components/LoginPage/LoginSignup";
import LoginWithGroup from "./components/LoginPage/LoginWithGroup/LoginWithGroup";
import { OBLanding } from "./components/LoginPage/OnBoarding/OBLanding";
import { SignUp } from "./components/LoginPage/SignUp";
import { ManageTeam } from "./components/ManageTeam/ManageTeam";
import { MainMeeting } from "./components/Meeting/MainMeeting";
import { SelectMeeting } from "./components/Meeting/SelectMeeting";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import { MainReview } from "./components/Review/MainReview";
import { MainSetting } from "./components/Setting/MainSetting";
import { MainSprintBoard } from "./components/SprintBoard/MainSprintBoard";
import PermanentDrawer from "./components/Utilities/PermanentDrawer";
import { TopAppBar } from "./components/Utilities/TopNavBar";
import WelcomePage from "./components/Utilities/WelcomePage";

/**
 * Layout component used to work with React Router.
 * This is a basic layout component that renders the React component passed as a prop.
 * It's used primarily to work with React Router, and handles the public part of the application.
 *
 * @param {object} props - The props object should be a React Component.
 * @param {React.ComponentType} props.element - The React component to be rendered within the layout.
 * @returns {React.ReactElement} The layout children component.
 */
function Layout({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

/**
 * CustomLayout component used to work with private React Router.
 * This layout includes the TopAppBar and PermanentDrawer components, and is used for protected routes.
 * It renders the React component passed as a prop in the context of this layout, which avoids repetitive
 * rerenders of shared Nav Bar and Side Bar
 *
 * @param {object} props - The props object should be a React Component.
 * @param {React.ComponentType} props.element - The React component to be rendered within this custom layout.
 * @returns {React.ReactElement} The custom layout component.
 */
function CustomLayout({ children }) {
  return (
    <>
      <TopAppBar />
      <PermanentDrawer />
      <Outlet />
    </>
  );
}

/**
 * The React Router System.
 * It handles both public and protected routes for different pages.
 *
 * @returns {React.ReactElement} The main application component.
 */
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login/signup" element={<SignUp />} />
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<CustomLayout />}>
              <Route path="/dashboard" element={<MainDashboard />} />
              <Route path="/sprintboard" element={<MainSprintBoard />} />
              <Route path="/meeting">
                <Route index element={<MainMeeting />} />
                <Route path="selectmeeting" element={<SelectMeeting />} />
              </Route>
              <Route path="/review" element={<MainReview />} />
              <Route path="/manageteam" element={<ManageTeam />} />
              <Route path="/account" element={<MainAccount />} />
              <Route path="/setting" element={<MainSetting />} />
            </Route>
            {/* Protected Pages without Custom Layout */}
            <Route path="/login/ob_landing" element={<OBLanding />} />
            <Route
              path="/login/login_with_group"
              element={<LoginWithGroup />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;

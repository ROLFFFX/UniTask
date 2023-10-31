import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { MainDashboard } from "./components/Dashboard/MainDashboard";
import { MainSprintBoard } from "./components/SprintBoard/MainSprintBoard";
// import { MainHyperLink } from "./components/HyperLink/MainHyperLink";
import { MainAccount } from "./components/Account/MainAccount";
//import { HyperlinkDrawer } from "./components/HyperLink/HyperlinkDrawer.js";
import { LoginSignup } from "./components/LoginPage/LoginSignup";
import { MainMeeting } from "./components/Meeting/MainMeeting";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { MainReview } from "./components/Review/MainReview";
import { MainSetting } from "./components/Setting/MainSetting";

import { ForgotPassword } from "./components/LoginPage/ForgotPassword";
import { SignUp } from "./components/LoginPage/SignUp";
import MainSideBar from "./components/Utilities/MainSideBar";
import PermanentDrawer from "./components/Utilities/PermanentDrawer";
import { TopAppBar } from "./components/Utilities/TopNavBar";
import { SelectMeeting } from "./components/Meeting/SelectMeeting";
import { Skeleton } from "@mui/material";
import { MeetingContent } from "./components/Meeting/MeetingContent";
import { OB_landing } from "./components/LoginPage/OnBoarding/OB_landing";
import { ManageTeam } from "./components/ManageTeam/ManageTeam";
import RequireAuth from "./components/RequireAuth";

function Layout({ children }) {
  return (
    <>
      <Outlet />
    </>
  );
}

function CustomLayout({ children }) {
  return (
    <>
      <TopAppBar />
      <PermanentDrawer />
      {children}
    </>
  );
}

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/login/signup" element={<SignUp />} />
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<CustomLayout />}>
              <Route path="/login/ob_landing" element={<OB_landing />} />
              <Route path="/" element={<MainDashboard />} />
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
            <Route path="/login/ob_landing" element={<OB_landing />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;

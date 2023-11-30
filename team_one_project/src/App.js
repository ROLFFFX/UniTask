import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { MainAccount } from "./components/Account/MainAccount";
import { MainDashboard } from "./components/Dashboard/MainDashboard";
import { LoginSignup } from "./components/LoginPage/LoginSignup";
import LoginWithGroup from "./components/LoginPage/LoginWithGroup/LoginWithGroup";
import { OB_landing } from "./components/LoginPage/OnBoarding/OB_landing";
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
      <Outlet />
    </>
  );
}

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
            <Route path="/login/ob_landing" element={<OB_landing />} />
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

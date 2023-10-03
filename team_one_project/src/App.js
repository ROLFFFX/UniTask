import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import MainSideBar from "./components/MainSideBar";
import { MainDashboard } from "./components/Dashboard/MainDashboard";
import { MainSprintBoard } from "./components/SprintBoard/MainSprintBoard";
import { MainHyperLink } from "./components/HyperLink/MainHyperLink";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Dashboard } from "@mui/icons-material";
import LoginSignup from "./pages/LoginSignup";
function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/sprintboard">Sprint Board</Link>
          </li>
          <li>
            <Link to="/hyperlink">Hyperlink</Link>
          </li>
          <li>
            <Link to="/sidebar">Main Sidebar</Link>
          </li>
          <li>
            <Link to="/login">Login Page</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard">
          <Route index element={<MainDashboard />}></Route>
          {/* nested routes waiting to be populated */}
        </Route>

        <Route path="/sprintboard">
          <Route index element={<MainSprintBoard />}>
            {/* nested routes waiting to be populated */}
          </Route>
        </Route>

        <Route path="/hyperlink">
          <Route index element={<MainHyperLink />}></Route>
          {/* nested routes waiting to be populated */}
        </Route>

        <Route path="/sidebar">
          <Route index element={<MainSideBar />}></Route>
          {/* nested routes waiting to be populated */}
        </Route>

        <Route path="/login">
          <Route index element={<LoginSignup />}></Route>
          {/* nested routes waiting to be populated */}
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

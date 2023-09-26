import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";
import LoginSignup from "./pages/LoginSignup";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="">
      <Links />
      <MainSideBar />

      {/* <LoginSignup /> */}
      {/* <Routes>
            <Route path="/pages/LoginSignup" element={<LoginSignup />}/>
        </Routes> */}
    </div>
  );
}

export default App;

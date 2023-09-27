import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";
import LoginSignup from "./pages/LoginSignup";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <LoginSignup />
        <style>{'body { background-color: #16162A; }'}</style>
    </div>
  );
}

export default App;

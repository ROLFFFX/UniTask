import * as React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";

function App() {
  return (
    <>
      <Links />
      <MainSideBar />
    </>
  );
}

export default App;

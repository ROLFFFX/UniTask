import * as React from "react";
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";

function App() {
  return (
    <div className="parent">
      <div className="div1">
        <MainSideBar />
      </div>
      <div className="div2">
        <Links />
      </div>
    </div>
  );
}

export default App;

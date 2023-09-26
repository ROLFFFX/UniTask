import * as React from "react";
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";
import LoginSignup from "./components/login.rg.fpw/LoginSignup";

function App() {
  return (
    <div className="parent">
      <div className="div1">
        <MainSideBar />
      </div>
      <div className="div2">
        <Links />
      </div>
      <div className="div3">
        <LoginSignup />
      </div>
    </div>
  );
}

export default App;

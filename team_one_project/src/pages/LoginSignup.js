import React, { useState } from "react";
import "./loginstyle.css";

import nlogo from "../images/UniTaskLOGO.PNG";
import gm from "../images/icons-gmail.png";
import fb from "../images/icons-facebook.png";
import gh from "../images/icons-github.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="login_container">
      <div className="header">
        <div className="text">{action}</div>
      </div>
      {/* <div className="login_inputs"> */}
      <div className="input">
        <input type="Username" />
      </div>
      <div className="login_input">
        <input type="Password" />
      </div>
      <div className="login_input">
        <input type="Email/Phone" />
      </div>
      <div className="login_input">
        <input type="Set Password" />
      </div>
      <div className="login_input">
        <input type="Confirm Password" />
      </div>
      {/* </div> */}
      <button className="login_switch" id="toLG">
        Already Registered?Login
      </button>
      <button className="login_switch" id="toFPW">
        Forgot Password?{" "}
      </button>
      <button className="login_switch" id="toSU">
        Don't have an account?Sign up
      </button>
      <button className="login_submit" id="submitSU">
        Sign Up
      </button>
      <button className={"login_submit"} id="submitLG">
        Login
      </button>
    </div>
  );
};

export default LoginSignup;

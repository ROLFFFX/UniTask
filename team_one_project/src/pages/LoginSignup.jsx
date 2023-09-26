import React, { useState } from "react";
import "./loginstyle.css";

import nlogo from "../images/UniTaskLOGO.PNG";
import gm from "../images/icons-gmail.png";
import fb from "../images/icons-facebook.png";
import gh from "../images/icons-github.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="Username" />
        </div>
        <div className="input">
          <input type="Password" />
        </div>
        <div className="input">
          <input type="Email/Phone" />
        </div>
        <div className="input">
          <input type="Set Password" />
        </div>
        <div className="input">
          <input type="Confirm Password" />
        </div>
      </div>
      <button className="switch" id="toLG">
        Already Registered?Login
      </button>
      <button className="switch" id={"toFPW"}>
        Forgot Password?{" "}
      </button>
      <button className="switch" id={"toSU"}>
        Don't have an account?Sign up
      </button>
      <button className={"submit"} id={"submitSU"}>
        Sign Up
      </button>
      <button className={"submit"} id={"submitLG"}>
        Login
      </button>
    </div>
  );
};

export default LoginSignup;

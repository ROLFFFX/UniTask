import React, { useState } from "react";
import "./loginstyle.css";

import nlogo from "../../images/UniTaskLOGO.PNG";
import gm from "../../images/icons-gmail.png";
import fb from "../../images/icons-facebook.png";
import gh from "../../images/icons-github.png";

export default function LoginSignup() {
  const [action, setAction] = useState("Sign Up");
  return (
    <>
      <div className={"bg"}>
        <div className="left-wrapper">
          <img id="logo" src={nlogo} alt=""></img>
        </div>

        <div className="container">
          <div className={"uppersect"}>
            <div className="header">
              <div className="text">{action}</div>
            </div>
            <div className="inputs">
              {action === "Sign Up" || "LogIn" ? (
                <div className="input">
                  <input type="Username" defaultValue="Username" />
                </div>
              ) : null}
              {action === "Sign Up" || "Forgot Password?" ? (
                <div className="input">
                  <input type="Email/Phone" defaultValue="Email/Phone" />
                </div>
              ) : null}
              {action === "Sign Up" ? (
                <div>
                  <div className="input">
                    <input type="Set Password" defaultValue="Set Password" />
                  </div>
                  <div className="input">
                    <input
                      type="Confirm Password"
                      defaultValue="Confirm Password"
                    />
                  </div>
                </div>
              ) : action === "LogIn" ? (
                <div className="input">
                  <input type="Password" defaultValue="Password" />
                </div>
              ) : null}
            </div>
            {action === "Sign Up" ? (
              <button className={"submit"} id={"submitSU"}>
                Sign Up
              </button>
            ) : action === "LogIn" ? (
              <button className={"submit"} id={"submitLG"}>
                Login
              </button>
            ) : (
              <button className={"submit"} id={"submitFPW"}>
                Reset Password
              </button>
            )}
            {action !== "Forgot Password?" ? (
              <button
                className="switch"
                id={"toFPW"}
                onClick={() => setAction("Forgot Password?")}
              >
                Forgot Password?{" "}
              </button>
            ) : null}
          </div>

          <div className={"midsect"}>
            <div>
              <img className={"icons"} src={gm} alt=""></img>
              <img className={"icons"} src={fb} alt=""></img>
              <img className={"icons"} src={gh} alt=""></img>
            </div>
          </div>

          <div className={"lowersect"}>
            {action === "Sign Up" ? (
              <button
                className="switch"
                id="toLG"
                onClick={() => setAction("LogIn")}
              >
                Already Registered?Login
              </button>
            ) : (
              <button
                className="switch"
                id={"toSU"}
                onClick={() => setAction("Sign Up")}
              >
                Don't have an account?Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

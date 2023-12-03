/**
 * @fileoverview Main entry point for UniTask Front End.
 * This file sets up the root React component and wraps it with necessary providers
 * and routing components. It includes the setup for CookiesProvider, BrowserRouter,
 * and AuthProvider to manage cookies, routing, and authentication contexts.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CookiesProvider } from "react-cookie";

// root DOM element. essentially where the entire project lives
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * CookiesProvider: provide cookie management throughout app, specifically used to store globa auth state.
 * BrowserRouter: React Router set up.
 * AuthProvider: auth state context.
 *
 **/
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </CookiesProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

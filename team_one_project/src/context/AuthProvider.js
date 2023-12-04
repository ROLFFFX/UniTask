/**
 * @fileoverview This file defines the AuthContext and provides the AuthProvider component for managing
 * authentication state in a React application. It uses react-cookie for cookie management and Context
 * API provided by React.
 */

import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

/**
 * AuthProvider - A provider component for the AuthContext. It wraps the entire app in index.js.
 *
 * This component initializes and provides the authentication state to its child components.
 * It synchronizes the authentication state with browser cookies to persist the login state.
 * It utilizes the context API provided by react to achieve global state management.
 *
 * Props:
 * @prop {React.ReactNode} children - The child components that consume the authentication context.
 *
 * State:
 * @state @type {Object} auth - The current authentication state, initially derived from cookies.
 * @state @type {Array} cookies - An array of cookies used for managing persistent authentication.
 *
 * @todo for a more secured app, we should use server side cookie and HTTP ONLY request to handle persistent login.
 *
 * @returns {React.ReactElement} A Provider component that wraps child components with the authentication context.
 */
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [auth, setAuth] = useState(cookies.auth || {});

  useEffect(() => {
    // Whenever auth state changes, update the cookie as well
    if (auth?.user) {
      setCookie("auth", auth, { path: "/", maxAge: 1800 }); // expires in 30 minutes
    }
  }, [auth, setCookie]);
  // handle logout, which empties global auth states as well as cookies.
  const logout = () => {
    setAuth({});
    removeCookie("auth", { path: "/" });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

/**
 * @fileoverview This file includes the RequireAuth component, which is used as a higher-order component
 * to manage authentication-based protected routing in a React application. It relies on react-router-dom
 * for navigation, react-cookie for cookie management, and a custom useAuth hook for authentication state.
 */

import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * RequireAuth - A functional component used to protect routes that require user authentication. It wraps the
 * entire protected routed parts of this app.
 *
 * This component checks the current authentication state and decides whether to render the child component
 * (via the Outlet component of react-router-dom) or redirect the user to the login page. It also synchronizes
 * the authentication state with cookies to persist the user's login state across sessions.
 *
 * Note that for testing purpose, this code snippet is useful for console.log auth state at each protected page:
 * useEffect(() => {
 *  console.log("Auth State: ", auth);
 * }, []);
 * @todo For a more secured app, one possible improvement we could add is to include an API call that authenticates the
 * credentials during this phase. Currently it only checks for the existence of auth state, which will be wiped out at
 * defined
 *
 * State:
 * @state @type {Object} auth - The current authentication state from the useAuth hook.
 * @state @type {Array} cookies - The array of cookies retrieved by useCookies hook.
 *
 * @returns {React.ReactElement} A React element that either renders the child components or redirects to the login page based on authentication.
 */
const RequireAuth = () => {
  const [cookies, setCookie] = useCookies(["auth"]);
  const { auth, setAuth } = useAuth();
  // If there's no auth state but we have cookies, set the state
  if (!auth?.user && cookies.auth?.user) {
    setAuth(cookies.auth);
  }
  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;

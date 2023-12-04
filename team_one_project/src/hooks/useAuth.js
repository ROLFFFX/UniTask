/**
 * @fileoverview This file defines the useAuth custom hook, which provides a convenient way to access
 * the authentication contex. It simplifies the consumption of AuthContext across the application.
 */

import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * useAuth - A custom hook for accessing the AuthContext.
 *
 * This hook utilizes the useContext React hook to provide easy access to the AuthContext.
 * It allows components to access authentication state and functionalities such as login and logout,
 * accessing current logged in user info. Below are fields that we do store in the context, call
 * useAuth cook in any other protected components like const { auth } = useAuth() to access auth state.
 * - selectedWorkspace
 * - userEmail
 * - userJWT
 *
 * @returns {Object} The authentication context, including auth state and associated methods.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

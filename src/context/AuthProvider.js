import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [auth, setAuth] = useState(cookies.auth || {});

  useEffect(() => {
    // Whenever auth state changes, update the cookie as well
    if (auth?.user) {
      setCookie("auth", auth, { path: "/", maxAge: 1800 }); // expires in 30 minutes
    }
  }, [auth, setCookie]);

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
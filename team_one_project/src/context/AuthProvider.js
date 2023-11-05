import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [auth, setAuth] = useState(cookies.auth || {});

  useEffect(() => {
    // Whenever auth state changes, update the cookie as well
    if (auth?.user) {
      setCookie("auth", auth, { path: "/", maxAge: 1800 }); // Expires in 30 minutes
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

//without cookie
// import { createContext, useState } from "react";

// const AuthContext = createContext({}); // this is the initial auth.user

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

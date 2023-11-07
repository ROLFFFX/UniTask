import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

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

//without cookie
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = () => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   console.log("RequireAuth is rendering, auth:", auth);

//   return auth?.user ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;

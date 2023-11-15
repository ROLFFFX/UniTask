import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// This customized useAuth hook will be a global hook
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

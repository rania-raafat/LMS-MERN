import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { getStoredUser } from "../services/authApi";

const AuthGuard = () => {
  const location = useLocation();

  const token = localStorage.getItem("lms_token");
  const user = getStoredUser();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (!user) {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");

    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (user.role !== "owner") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
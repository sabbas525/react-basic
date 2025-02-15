import React, { useEffect } from "react";
import { Link, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LastVisitedPages from "./components/LastVisitedPages";
import Notifications from "./components/Notifications";
import ErrorMessage from "./components/ErrorMessage";
import AppRoutes from "./AppRoutes";
import { LOGOUT_USER } from "./redux/actionTypes";

export default function App({ router: RouterComponent = BrowserRouter }) {
  return (
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  // If no user is in state, default to a guest object so that the nav shows Register/Login.
  const user = useSelector((state) => (state.auth && state.auth.user) || { role: "guest" });
  const location = useLocation();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  const handleLogout = () => {
    // For testing purposes, we simply dispatch a plain action.
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/about">About</Link>{" "}
        {(!user || user.role === "guest") ? (
          <>
            <Link to="/register">Register</Link>{" "}
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/vip">VIP Area</Link>{" "}
            <Link to="/vip/products">VIP Products</Link>{" "}
            <Link to="/vip/posts">VIP Posts</Link>{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      {error && <ErrorMessage />}
      <LastVisitedPages />
      <Notifications />
      <AppRoutes />
    </>
  );
}

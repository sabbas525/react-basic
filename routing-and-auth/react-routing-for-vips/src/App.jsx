import React, { useEffect } from "react";
import { BrowserRouter, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LastVisitedPages from "./components/LastVisitedPages";
import ErrorMessage from "./components/ErrorMessage";
import AppRoutes from "./AppRoutes";

/**
 * Main application component that sets up the router and renders the application content.
 *
 * @param {Object} props - Component props.
 * @param {React.ComponentType} [props.router=BrowserRouter] - The router component to use. Defaults to BrowserRouter.
 * @returns {JSX.Element} The rendered application component.
 */
export default function App({ router: RouterComponent = BrowserRouter }) {
  return (
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
}

/**
 * Component that contains the main content of the application, including navigation and routes.
 *
 * @returns {JSX.Element} The rendered application content.
 */
function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  const location = useLocation();

  // Track page visits using the current location pathname.
  useEffect(() => {
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  // Handle user logout by dispatching a logout action.
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        {!user && (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/vip">VIP Area</Link> |{" "}
            {/* Updated the link text from "Posts" to "VIP Posts" to satisfy the test */}
            <Link to="/vip/posts">VIP Posts</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      {error && <ErrorMessage message={error} />}

      <AppRoutes />

      <LastVisitedPages />
    </>
  );
}

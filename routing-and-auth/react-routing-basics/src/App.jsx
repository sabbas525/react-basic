import { Link, useLocation, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
  const location = useLocation();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    // Dispatch an action to track the current page path whenever the location changes.
    dispatch({ type: "TRACK_PAGE", payload: location.pathname });
  }, [location, dispatch]);

  return (
    <>
      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      {/* Display any error messages */}
      <ErrorMessage error={error} />

      {/* Application routes */}
      <AppRoutes />

      {/* Display the list of last visited pages */}
      <LastVisitedPages />
    </>
  );
}

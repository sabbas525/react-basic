import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Register from "./components/Register"; // only shown to NON-logged-in users AKA non-VIPs
import Login from "./components/Login"; // only shown to NON-logged-in users AKA non-VIPs
import VIPArea from "./components/VIPArea"; // VIP-only
import Posts from "./components/Posts"; // VIP-only

/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management.
 * Only logged-in users (VIPs) have access to the VIPArea and Posts components.
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/register" renders the Register component.
 * - "/login" renders the Login component.
 * - "/vip" renders the VIPArea component if the user is logged in, otherwise redirects to the Login component.
 *   - "/vip/posts" renders the Posts component if the user is logged in, otherwise redirects to the Login component.
 * - "*" renders the NotFound component for any undefined routes.
 *
 * The VIP routes are nested under the VIPArea route. The route 
 *  /vip/posts must be nested inside 
 *  /vip. 
 * See: https://reactrouter.com/start/library/routing.
 *
 * @component
 */
export default function AppRoutes() {
  const user = useSelector((state) => state.user); // Check if user is logged in

  return (
    <Routes>
      {/* Basic Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Public Routes - accessible only if the user is NOT logged in */}
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

      {/* Protected Routes - accessible only if the user is logged in */}
      <Route
        path="/vip"
        element={user ? <VIPArea /> : <Navigate to="/login" replace />}
      >
        {/* Nested Protected Route */}
        <Route
          path="posts"
          element={user ? <Posts /> : <Navigate to="/login" replace />}
        />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

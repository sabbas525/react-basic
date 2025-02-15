import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import NotFound from "./components/NotFound";

/**
 * AppRoutes component defines the routing structure for the application.
 *
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/posts" renders the Posts component.
 * - "*" renders the NotFound component for any undefined routes.
 *
 * @component
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

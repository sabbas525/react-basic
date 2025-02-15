import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import VIPArea from "./components/VIPArea";
import Posts from "./components/Posts";
import Products from "./components/Products";

export default function AppRoutes() {
  // (You can use the user from Redux if needed for further route guarding.)
  const user = useSelector((state) => (state.auth && state.auth.user) || null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vip" element={<VIPArea />}>
        {/* Nested VIP routes */}
        <Route path="posts" element={<Posts />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

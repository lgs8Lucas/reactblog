import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";

const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default BlogRoutes;

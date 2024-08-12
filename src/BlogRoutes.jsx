import React from "react";

import { useAuthValue } from "./context/AuthContext";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

const BlogRoutes = () => {
	const { user } = useAuthValue();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
			<Route
				path="/register"
				element={!user ? <Register /> : <Navigate to="/" />}
			/>
			<Route
				path="/posts/create"
				element={user ? <CreatePost /> : <Navigate to="/login" />}
			/>
			<Route
				path="/dashboard"
				element={user ? <Dashboard /> : <Navigate to="/login" />}
			/>
		</Routes>
	);
};

export default BlogRoutes;

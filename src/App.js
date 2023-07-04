//1. import useState
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import TourPage from "./components/TourPage/TourPage";
import PostTour from "./components/PostTour/PostTour";
import EditTour from "./components/EditTour/EditTour";
import UsersPage from "./components/UserPage/UserPage";

function App() {
	// 2. make the state

	return (
		<div className="container">
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="/tour/:id" element={<TourPage />} />
				<Route path="/posttour" element={<PostTour />} />
				<Route path="/edittour/:id" element={<EditTour />} />
				<Route path="/users" element={<UsersPage />} />

				<Route path="*" element={<p>Page Not Found</p>} />
			</Routes>
		</div>
	);
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchFunction from "./pages/Search";
import Library from "./pages/Library";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log_In" element={<Login />} />
        <Route path="/sign_Up" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/search" element={<SearchFunction />} />
        <Route path="/library" element={<Library />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />


        <Route path="*" element={<div className="p-8">Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

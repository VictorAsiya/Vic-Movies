import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import MovieRecs from "./pages/MovieRecs";
import SearchFunction from "./pages/Search";
import Library from "./pages/Library";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MovieRecs />} />
        <Route path="/search" element={<SearchFunction />} />
        <Route path="/library" element={<Library />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

        <Route path="*" element={<div className="p-8">Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import NewRelease from "../components/newRelease/newRelease";
import Trending from "../components/Trending/trending";
import PopularCategories from "../components/PopularCategory/popularCategories";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    async function loadMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    loadMovies();
  }, []);

  return (
    <SC.Main2 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-[16px] font-semibold">Welcome, {username || "Guest"}</h2>
          <Link to="/profile">
            <UserCircle size={28} className="text-light-text hover:scale-105 transition-transform" />
          </Link>
        </div>

        <Trending />
        <NewRelease />
        <PopularCategories />
        <BottomNav />
      </div>
    </SC.Main2>
  );
}

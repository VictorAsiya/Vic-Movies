import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import NewRelease from "../components/newRelease/newRelease";
import Trending from "../components/Trending/trending";
import PopularCategories from "../components/PopularCategory/popularCategories";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function MovieRecs() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
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
      <div className="bg-container text-light-text lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center justify-center align-center">
        <h2 className="text-[16px] font-semibold mb-2 mt-5">Movies</h2>

        <Trending />
        <NewRelease />
        <PopularCategories />
        <BottomNav />
      </div>
    </SC.Main2>
  );
}

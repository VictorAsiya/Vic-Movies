import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";
import { genreMap } from "../assets/genres/genresMap";
import { CustomButton } from "../components/button";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  genre_ids?: number[]; // If you're using genre IDs from TMDB
  genres?: { id: number; name: string }[];
};

export default function Library() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<
    "watchlist" | "favourite" | "settings"
  >("watchlist");

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    const storedFav = localStorage.getItem("favourites");

    setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    setFavourites(storedFav ? JSON.parse(storedFav) : []);
  }, []);

  const renderMovies = (movies: Movie[], title: string) => (
    <>
      <h2 className="text-[16px] font-semibold mb-3 text-left pl-2">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies in {title.toLowerCase()} yet.</p>
      ) : (
        <div className="grid grid-cols-1 px-2 gap-4 w-full">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="rounded-md w-full h-[20vh] flex justify-between bg-input py-1 pr-1 overflow-hidden"
            >
              <div className="flex flex-col  text-left p-2 w-[60%] relative">
                <p className="text-gray-400">
                  {movie.genre_ids
                    ?.map((id) => genreMap[id])
                    .filter(Boolean)
                    .join(", ") || "Unknown Genre"}
                </p>
                <h2 className=" font-bold">{movie.title}</h2>
                <div className="text-xs text-gray-400 mt-1">
                  <p>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "Unknown Year"}{" "}
                    •{" "}
                    {movie.runtime
                      ? `${movie.runtime} mins`
                      : "Duration Unknown"}
                  </p>
                </div>
              </div>

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="rounded-md object-cover h-full"
              />
              {/* <CustomButton
                type={"submit"}
              title={"Remove"}
              className="w-[5%] bg-buttons p-[6px] absolute mt-20 ml-2"
              /> */}
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <SC.Main5 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen mb-12 flex flex-col text-center align-top">
        <span className="flex items-center gap-[33%]">
          <Link to="/Home">
            <ArrowLeft size={20} className="mb-5" />
          </Link>
          <h2 className="text-[16px] font-semibold mb-10">My Library</h2>
        </span>

        {/* Toggle Buttons */}
        <span className="flex left-0 mb-6 gap-2 ">
          {["watchlist", "favourite", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-1 rounded-xl text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-red-700 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </span>

        {/* Content Sections */}
        {activeTab === "watchlist" && renderMovies(watchlist, "Your Watchlist")}
        {activeTab === "favourite" &&
          renderMovies(favourites, "Your Favourites")}
        {activeTab === "settings" && (
          <p className="text-gray-400">Settings Coming Soon...</p>
        )}
      </div>
      <BottomNav />
    </SC.Main5>
  );
}

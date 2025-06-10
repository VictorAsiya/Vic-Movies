import React, { useState } from "react";
import { CustomInput } from "../components/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function SearchFunction() {
  const [movieName, setMovieName] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          movieName
        )}`
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SC.Main3 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        {/* Header */}
        <span className="flex items-center gap-[33%]">
          <Link to="/Home">
            <ArrowLeft size={20} className="mb-5" />
          </Link>
          <h2 className="text-[16px] font-semibold mb-10">Movie Search</h2>
        </span>

        {/* Search Input */}
        <form className="space-y-4" onSubmit={handleSearch}>
          <CustomInput
            name="name"
            placeholder="Input Movie Name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="pr-10"
            rightIcon={
              <button type="submit">
                <Search className="text-gray-400" size={20} />
              </button>
            }
          />
        </form>

        {/* Results */}
        <div className="mt-6 text-left mb-12">
          {isLoading && <p className="text-center mt-4">Searching...</p>}

          {!isLoading && searchResults.length === 0 && movieName && (
            <p className="text-center mt-4 text-sm text-gray-400">
              No results found.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            {searchResults.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-[rgba(153,27,27,0.7)] rounded-md overflow-hidden"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-auto"
                />
                <p className="p-2 text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </SC.Main3>
  );
}

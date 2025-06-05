import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import * as SC from "../../style";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    };

    const fetchRelated = async () => {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
      );
      const data = await res.json();
      setRelated(data.results || []);
    };

    async function fetchCredits() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
      setCredits(data);
    }

    async function fetchReviews() {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
      );
      const data = await res.json();
      console.log("Reviews fetched:", data); // Add this line
      setReviews(data.results.slice(0, 2));
    }

    fetchMovie();
    fetchRelated();
    fetchCredits();
    fetchReviews();
  }, [id]);

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 4);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <SC.Main4 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <span className="flex justify-between items-center px-3 mb-5">
          <Link to="/">
            <ArrowLeft size={20} />
          </Link>
          <Link to="/library">
            <Bookmark size={20} className="float-right" />
          </Link>
        </span>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-md mb-4"
        />

        <div className=" px-3">
          <h1 className="text-[20px] text-left font-bold mb-3">
            {movie.title}
          </h1>
          <p className="mb-2 text-justify">{movie.overview}</p>

          <div className="mt-4 text-left">
            <h2 className="text-xl font-semibold">Cast:</h2>
            <ul>
              {cast?.map((actor) => (
                <li key={actor.id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-left">
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>

          <p className="text-left">
            <strong>Director:</strong> {director?.name}
          </p>

          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold">Reviews:</h2>
            {reviews.map((review) => (
              <div key={review.id} className="my-4 p-3 bg-gray-800 rounded">
                <p className="text-sm text-gray-300">By {review.author}</p>
                <p className="text-sm mt-2">
                  {review.content.slice(0, 200)}...
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-xl text-left font-semibold mt-5 mb-2">
            Related Movies
          </h2>
          <div className="custom-scroll flex gap-3 overflow-x-auto py-3">
            {related.map((relMovie) => (
              <div
                key={relMovie.id}
                className="bg-[rgba(153,27,27,0.7)] relative py-2 rounded-md min-w-[230px] min-h-[380px]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${relMovie.poster_path}`}
                  alt={relMovie.title}
                  className=" w-[100%] absolute top-0 "
                />
                <p className="text-sm absolute bottom-2 left-3">
                  {relMovie.title}
                </p>
              </div>
            ))}
          </div>

          <button className=" cursor-pointer mt-6 w-full bg-red-700 py-2 rounded-md text-white hover:bg-red-800">
            Add to Watchlist
          </button>
        </div>
      </div>
    </SC.Main4>
  );
}

import React from "react";
import { CustomInput } from "../components/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";

export default function SearchFunction() {
  const [movieName, setMovieName] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (movieName.trim()) {
      // trigger search logic here
      console.log("Searching for:", movieName);
    }
  };

  return (
    <SC.Main3 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3  lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <span className="flex items-center gap-[33%]">
          <Link to="/">
            <ArrowLeft size={20} className="mb-5" />
          </Link>
          <h2 className="text-[16px] font-semibold mb-10 mt-5">Movie Search</h2>
        </span>

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
      </div>
      <BottomNav />
    </SC.Main3>
  );
}

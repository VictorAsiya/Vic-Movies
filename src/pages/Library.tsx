import React from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav.tsx/bottomNav";
import * as SC from "../../style";

export default function Library() {
  return (
    <SC.Main5 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text p-8 lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <span className="flex items-center gap-[33%]">
          <Link to="/">
            <ArrowLeft size={20} className="mb-5" />
          </Link>
          <h2 className="text-[16px] font-semibold mb-10 mt-5">My Library</h2>
        </span>

        <span className="flex left-0">
          <button className="px-4 py-1 rounded-xl text-sm font-medium">
            Watchlist
          </button>
          <button className="px-4 py-1 rounded-xl text-sm font-medium">
            Favourite
          </button>
          <button className="px-4 py-1 rounded-xl text-sm font-medium">
            Settings
          </button>
        </span>
      </div>
      <BottomNav />
    </SC.Main5>
  );
}

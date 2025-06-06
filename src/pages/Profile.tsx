import React from "react";
import * as SC from "../../style";
import BottomNav from "../components/BottomNav.tsx/bottomNav";

export default function Profile() {
  return (
    <SC.Main6 className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-container text-light-text py-8 px-3  lg:rounded-2xl shadow-md w-full max-w-md min-h-screen flex flex-col text-center align-top">
        <h2 className="text-[16px] font-semibold mb-10">Profile</h2>
      </div>

      <BottomNav/>
    </SC.Main6>
  );
}

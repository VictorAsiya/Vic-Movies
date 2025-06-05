import React from "react";

export const CustomButton = ({ title, type, className = "" }) => {
  return (
    <button
      type=""
      className={`bg-buttons rounded-[8px] cursor-pointer text-light-text focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {title}
    </button>
  );
};

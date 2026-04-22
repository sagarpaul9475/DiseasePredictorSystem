import React from "react";

const SkeletonCard = () => {
  return (
    <div
      role="status"
      className="space-y-4 animate-pulse flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-72"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
        <svg
          className="w-10 h-10 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.8 515.8 0 560 0s80 35.8 80 80-35.8 80-80 80-80-35.8-80-80zM0 160c0-35.3 28.7-64 64-64h128c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V160z" />
        </svg>
      </div>

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded-full w-40"></div>

      {/* Buttons */}
      <div className="flex w-full gap-2">
        <div className="h-8 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded-full w-1/2"></div>
      </div>

      {/* Lines */}
      <div className="w-full space-y-2">
        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <article className="flex flex-wrap gap-10 w-full justify-center p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </article>
  );
};

export default SkeletonLoader;
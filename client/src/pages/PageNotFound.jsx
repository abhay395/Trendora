import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center px-6">
        <h1 className="text-9xl font-extrabold text-white drop-shadow-xl animate-pulse">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-200">
          Oops! Page not found
        </p>
        <p className="mt-2 text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-black border border-white text-white rounded-xl font-medium shadow-lg hover:bg-white hover:text-black hover:border-black transition duration-300"
        >
          Go Back Home
        </Link>

        {/* <div className="mt-10">
          <img
            src="https://illustrations.popsy.co/white/sad.svg"
            alt="Not Found Illustration"
            className="w-72 mx-auto opacity-80"
          />
        </div> */}
      </div>
    </div>
  );
};

export default PageNotFound;

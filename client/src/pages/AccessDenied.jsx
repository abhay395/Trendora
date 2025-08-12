import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-5xl font-bold text-black mb-4">403</h1>
        <p className="text-xl text-gray-700 font-semibold">Access Denied</p>
        <p className="text-gray-500 mt-2">
          You do not have permission to view this page.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-lg font-medium shadow hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

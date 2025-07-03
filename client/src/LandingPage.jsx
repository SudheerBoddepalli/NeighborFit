import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-100">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-xl w-full">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 flex justify-center items-center gap-2">
          🏠 Welcome to <span className="text-purple-900">NeighborFit</span>
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Discover your perfect neighborhood match based on your lifestyle preferences.
        </p>
        <button
          onClick={() => navigate('/matcher')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
        >
          🔍 Find Your Match
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

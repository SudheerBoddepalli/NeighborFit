import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-3xl px-10 py-16 text-center max-w-xl">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">🏡 Welcome to NeighborFit</h1>
        <p className="text-gray-700 mb-8 text-lg">Discover your perfect neighborhood match based on your lifestyle preferences.</p>
        <button
          onClick={() => navigate('/match')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
        >
          🔍 Find Your Match
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

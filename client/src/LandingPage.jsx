// src/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-yellow-100 p-6">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">🏡 Welcome to NeighborFit</h1>
        <p className="text-lg mb-8 text-gray-700">Find your ideal neighborhood based on your lifestyle</p>
        <button
          onClick={() => navigate('/match')}
          className="px-6 py-3 text-white font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 shadow"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

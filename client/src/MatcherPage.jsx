import React, { useState } from 'react';
import axios from 'axios';

const MatcherPage = () => {
  const [prefs, setPrefs] = useState({ safety: 5, affordability: 5, cafes: 5 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPrefs({ ...prefs, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://neighborfit-backend-ybhn.onrender.com/api/match', prefs);
      setResults(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setResults([]);
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center gap-2">
          🏡 NeighborFit Matcher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['safety', 'affordability', 'cafes'].map((cat) => (
            <div key={cat}>
              <label className="block text-gray-700 font-medium mb-1 capitalize">
                {cat} (0–10): <span className="text-purple-700 font-semibold">{prefs[cat]}</span>
              </label>
              <input
                type="range"
                name={cat}
                min="0"
                max="10"
                value={prefs[cat]}
                onChange={handleChange}
                className="w-full accent-purple-600"
              />
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              🔍 Find Match
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Matches</h2>
          <div className="space-y-2">
            {results.map((n, idx) => (
              <div key={idx} className="bg-purple-100 px-4 py-2 rounded-lg text-purple-900 shadow-sm">
                🌟 {n.name} — <span className="font-bold">Score: {n.score.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatcherPage;

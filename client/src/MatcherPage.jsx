import React, { useState } from 'react';
import axios from 'axios';

function MatcherPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">🏘️ NeighborFit Matcher</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {['safety', 'affordability', 'cafes'].map((cat) => (
            <div key={cat}>
              <label className="block text-gray-700 font-semibold mb-1 capitalize">
                {cat} (0–10): <span className="text-purple-600">{prefs[cat]}</span>
              </label>
              <input
                type="range"
                name={cat}
                min="0"
                max="10"
                value={prefs[cat]}
                onChange={handleChange}
                className="w-full accent-purple-500"
              />
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-full shadow-md transition"
            >
              🔍 Find Match
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600 font-medium text-center">{error}</div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Top Matches</h2>
          <div className="grid gap-4">
            {results.map((n, idx) => (
              <div
                key={idx}
                className="bg-purple-100 border border-purple-300 p-4 rounded-lg shadow-sm text-purple-900 font-medium"
              >
                🌟 {n.name} — <span className="font-bold">Score: {n.score.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatcherPage;

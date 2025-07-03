import React, { useState } from 'react';
import axios from 'axios';

function App() {
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
    <div className="min-h-screen bg-gradient-to-r from-violet-200 via-indigo-200 to-blue-200 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-10 space-y-8">
        <h1 className="text-5xl font-bold text-center text-purple-700 flex items-center justify-center gap-2">
          🏡 NeighborFit Matcher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {['safety', 'affordability', 'cafes'].map((cat) => (
            <div key={cat}>
              <label className="block font-semibold text-gray-700 mb-1 capitalize">
                {cat} (0–10): <span className="text-purple-600">{prefs[cat]}</span>
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
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
            >
              🔍 Find Match
            </button>
          </div>
        </form>

        {error && (
          <div className="text-center text-red-600 font-semibold mt-4">{error}</div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Top Matches</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((n, idx) => (
                <div
                  key={idx}
                  className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-purple-800">{n.name}</h3>
                  <p className="text-gray-700 mt-1">⭐ Score: <span className="font-bold">{n.score.toFixed(2)}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

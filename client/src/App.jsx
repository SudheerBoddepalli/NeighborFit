import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prefs, setPrefs] = useState({ safety: 5, affordability: 5, cafes: 5 });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(''); // ✅ new state for error

  const handleChange = (e) => {
    setPrefs({ ...prefs, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/match', prefs);
      setResults(res.data);
      setError(''); // ✅ clear error on success
    } catch (err) {
      console.error(err);
      setResults([]);
      setError(err.response?.data?.error || 'Server error'); // ✅ display error
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NeighborFit Matcher</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        {['safety', 'affordability', 'cafes'].map((cat) => (
          <div key={cat}>
            <label className="block capitalize">{cat} (0–10)</label>
            <input
              type="range"
              name={cat}
              min="0"
              max="10"
              value={prefs[cat]}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Find Match
        </button>
      </form>

      {/* ✅ Error message display */}
      {error && (
        <div className="mt-4 text-red-600 font-semibold">
          {error}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Top Matches</h2>
        <ul className="mt-2 list-disc list-inside">
          {results.map((n, idx) => (
            <li key={idx}>{n.name} (Score: {n.score.toFixed(2)})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

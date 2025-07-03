import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MatcherPage from './MatcherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/matcher" element={<MatcherPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import './styles/App.css';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage onSelectDistrict={setSelectedDistrict} />} />
        <Route path="/dashboard" element={<DashboardPage district={selectedDistrict} />} />
      </Routes>
    </Router>
  );
}

export default App;

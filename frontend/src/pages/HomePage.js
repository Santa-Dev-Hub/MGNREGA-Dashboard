import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DistrictSelector from '../components/DistrictSelector';
import GeolocationHandler from '../components/GeolocationHandler';
import '../styles/HomePage.css';

function HomePage({ onSelectDistrict }) {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/districts`
      );
      setDistricts(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch districts:', err);
      setLoading(false);
    }
  };

  const handleSelectDistrict = (district) => {
    onSelectDistrict(district);
    navigate('/dashboard', { state: { district } });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1>{language === 'en' ? 'MGNREGA Performance Dashboard' : 'MGNREGA प्रदर्शन डैशबोर्ड'}</h1>
          <p className="subtitle">
            {language === 'en' 
              ? 'Understand how your district is performing in the MGNREGA program'
              : 'जानें आपके जिले में MGNREGA कार्यक्रम कैसा प्रदर्शन कर रहा है'}
          </p>
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <GeolocationHandler 
          districts={districts}
          onSelectDistrict={handleSelectDistrict}
          language={language}
        />

        <section className="selection-section">
          <h2>{language === 'en' ? 'Or Select Your District' : 'या अपना जिला चुनें'}</h2>
          {loading ? (
            <p className="loading">Loading districts...</p>
          ) : (
            <DistrictSelector 
              districts={districts}
              onSelect={handleSelectDistrict}
              language={language}
            />
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Data source: nrega.nic.in | Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}

export default HomePage;

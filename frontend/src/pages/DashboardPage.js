import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PerformanceCards from '../components/PerformanceCards';
import TrendChart from '../components/TrendChart';
import ComparisonChart from '../components/ComparisonChart';
import '../styles/DashboardPage.css';

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const district = location.state?.district;
  
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [stateAverage, setStateAverage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const fetchData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      console.log('Fetching data for district:', district.districtCode);
      console.log('API URL:', API_URL);
      
      const [latestRes, historyRes, stateRes] = await Promise.all([
        axios.get(`${API_URL}/api/data/district/${district.districtCode}`),
        axios.get(`${API_URL}/api/data/district/${district.districtCode}/history?months=12`),
        axios.get(`${API_URL}/api/data/state/averages`)
      ]);

      console.log('Latest data:', latestRes.data);
      console.log('Historical data:', historyRes.data);
      console.log('State average:', stateRes.data);

      setData(latestRes.data.data || latestRes.data);
      setHistoricalData(historyRes.data.data || historyRes.data || []);
      setStateAverage(stateRes.data.data || stateRes.data || {});
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
      console.error('Error details:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!district) {
      navigate('/');
      return;
    }
    
    fetchData();
  }, [district, navigate]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  if (loading) {
    return <div className="loading-page">Loading performance data...</div>;
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Make sure:</p>
        <ul>
          <li>Backend is running (npm run dev in backend folder)</li>
          <li>MongoDB is connected</li>
          <li>Data is seeded (npm run seed)</li>
        </ul>
        <button onClick={() => navigate('/')}>← Go Back</button>
      </div>
    );
  }

  if (!data) {
    return <div className="error-page">Unable to load data. Please try again.</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
        <h1>{district.districtName}</h1>
        <button className="lang-toggle" onClick={toggleLanguage}>
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </header>

      <main className="dashboard-content">
        <section className="kpi-section">
          <h2>{language === 'en' ? 'Key Performance Indicators' : 'मुख्य प्रदर्शन संकेतक'}</h2>
          <PerformanceCards data={data} language={language} />
        </section>

        <section className="trend-section">
          <h2>{language === 'en' ? 'Performance Trend (Last 12 Months)' : 'प्रदर्शन प्रवृत्ति (पिछले 12 महीने)'}</h2>
          <TrendChart data={historicalData} language={language} />
        </section>

        <section className="comparison-section">
          <h2>{language === 'en' ? 'How Your District Compares' : 'आपका जिला राज्य औसत से कैसे तुलना करता है'}</h2>
          <ComparisonChart 
            districtData={data} 
            stateAverage={stateAverage}
            language={language}
          />
        </section>

        <section className="insights-section">
          <h2>{language === 'en' ? 'What Does This Mean?' : 'इसका क्या मतलब है?'}</h2>
          <div className="insights-cards">
            <div className="insight-card">
              <h3>📊 {language === 'en' ? 'Employment Days' : 'रोज़गार दिन'}</h3>
              <p>{language === 'en' 
                ? 'More person days = more people got work. The goal is 100 days per household.'
                : 'अधिक व्यक्ति दिन = अधिक लोगों को काम मिला। लक्ष्य प्रति परिवार 100 दिन है।'}</p>
            </div>

            <div className="insight-card">
              <h3>💰 {language === 'en' ? 'Funds Utilization' : 'धन उपयोग'}</h3>
              <p>{language === 'en'
                ? 'Shows how much of the allocated money was actually spent. Higher = better.'
                : 'दिए गए पैसे का कितना इस्तेमाल हुआ यह दिखाता है। अधिक = बेहतर।'}</p>
            </div>

            <div className="insight-card">
              <h3>👩 {language === 'en' ? 'Women Participation' : 'महिलाओं की भागीदारी'}</h3>
              <p>{language === 'en'
                ? 'Percentage of women who got work. Program aims for women empowerment.'
                : 'काम पाने वाली महिलाओं का प्रतिशत। कार्यक्रम महिला सशक्तिकरण का लक्ष्य रखता है।'}</p>
            </div>

            <div className="insight-card">
              <h3>🏗️ {language === 'en' ? 'Works Completed' : 'पूरे किए गए काम'}</h3>
              <p>{language === 'en'
                ? 'Number of projects completed. These create lasting assets for the community.'
                : 'पूरी की गई परियोजनाओं की संख्या। ये समुदाय के लिए स्थायी संपत्ति बनाते हैं।'}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Data source: nrega.nic.in | Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}

export default DashboardPage;

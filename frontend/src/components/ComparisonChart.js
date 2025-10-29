import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Charts.css';

function ComparisonChart({ districtData, stateAverage, language }) {
  // Format large numbers for better readability
  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.round(num);
  };

  // Large scale metrics (Person Days, Expenditure)
  const largeScaleData = [
    {
      metric: language === 'en' ? 'Person Days' : 'व्यक्ति दिन',
      'Your District': districtData?.personDaysGenerated || 0,
      'State Average': stateAverage?.avgPersonDaysGenerated || 0
    },
    {
      metric: language === 'en' ? 'Expenditure (₹)' : 'व्यय (₹)',
      'Your District': districtData?.expenditure || 0,
      'State Average': stateAverage?.avgExpenditure || 0
    }
  ];

  // Small scale metrics (Works Completed, Women %)
  const smallScaleData = [
    {
      metric: language === 'en' ? 'Works Completed' : 'पूर्ण कार्य',
      'Your District': districtData?.worksCompleted || 0,
      'State Average': stateAverage?.avgWorksCompleted || 0
    },
    {
      metric: language === 'en' ? 'Women Workers (%)' : 'महिला कर्मचारी (%)',
      'Your District': districtData?.womenParticipation || 0,
      'State Average': stateAverage?.avgWomenParticipation || 0
    }
  ];

  return (
    <div className="chart-container">
      {/* Large Scale Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          {language === 'en' ? 'Employment & Expenditure' : 'रोजगार और व्यय'}
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={largeScaleData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip 
              formatter={(value) => formatNumber(value)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="Your District" fill="#27ae60" barSize={50} />
            <Bar dataKey="State Average" fill="#e74c3c" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Small Scale Chart */}
      <div>
        <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          {language === 'en' ? 'Works & Participation' : 'कार्य और भागीदारी'}
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={smallScaleData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip 
              formatter={(value) => Math.round(value)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="Your District" fill="#27ae60" barSize={50} />
            <Bar dataKey="State Average" fill="#e74c3c" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>■</span> {language === 'en' ? 'Your District' : 'आपका जिला'} 
          {' vs '}
          <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>■</span> {language === 'en' ? 'State Average' : 'राज्य औसत'}
        </p>
      </div>
    </div>
  );
}

export default ComparisonChart;

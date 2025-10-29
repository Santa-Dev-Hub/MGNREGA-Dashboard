import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '../styles/Charts.css';

function TrendChart({ data, language }) {
  if (!data || data.length === 0) {
    return <p>No historical data available</p>;
  }

  // Sort by date and format for display
  const sortedData = [...data]
    .sort((a, b) => {
      const dateA = new Date(a.year, parseInt(a.month.split('-')[1]) - 1);
      const dateB = new Date(b.year, parseInt(b.month.split('-')[1]) - 1);
      return dateA - dateB;
    })
    .map(d => ({
      month: d.month,
      'Person Days': d.personDaysGenerated || 0,
      'Active Workers': d.activeWorkers || 0,
      'Works Completed': d.worksCompleted || 0
    }));

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value) => formatNumber(value)} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Person Days" 
            stroke="#3498db" 
            strokeWidth={2}
            dot={{ fill: '#3498db', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="Active Workers" 
            stroke="#27ae60" 
            strokeWidth={2}
            dot={{ fill: '#27ae60', r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="Works Completed" 
            stroke="#e74c3c" 
            strokeWidth={2}
            dot={{ fill: '#e74c3c', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;

import React from 'react';
import '../styles/PerformanceCards.css';

function PerformanceCards({ data, language }) {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="performance-cards">
      <div className="card">
        <div className="card-header">👥</div>
        <h3>{language === 'en' ? 'Active Workers' : 'सक्रिय कर्मचारी'}</h3>
        <p className="card-value">{formatNumber(data.activeWorkers)}</p>
        <p className="card-description">{language === 'en' ? 'People working' : 'काम करने वाले लोग'}</p>
      </div>

      <div className="card">
        <div className="card-header">📅</div>
        <h3>{language === 'en' ? 'Person Days' : 'व्यक्ति दिन'}</h3>
        <p className="card-value">{formatNumber(data.personDaysGenerated)}</p>
        <p className="card-description">{language === 'en' ? 'Employment days generated' : 'रोज़गार दिन'}</p>
      </div>

      <div className="card">
        <div className="card-header">💰</div>
        <h3>{language === 'en' ? 'Funds Spent' : 'खर्च किए गए धन'}</h3>
        <p className="card-value">₹{(data.expenditure / 100000).toFixed(1)} Cr</p>
        <p className="card-description">{language === 'en' ? 'In crores' : 'करोड़ में'}</p>
      </div>

      <div className="card">
        <div className="card-header">🏗️</div>
        <h3>{language === 'en' ? 'Works Done' : 'पूरे किए गए काम'}</h3>
        <p className="card-value">{formatNumber(data.worksCompleted)}</p>
        <p className="card-description">{language === 'en' ? 'Projects completed' : 'परियोजनाएं पूरी हुईं'}</p>
      </div>

      <div className="card">
        <div className="card-header">👩💼</div>
        <h3>{language === 'en' ? 'Women Workers' : 'महिला कर्मचारी'}</h3>
        <p className="card-value">{data.womenParticipation || 0}%</p>
        <p className="card-description">{language === 'en' ? 'Of total workforce' : 'कुल कर्मबल का'}</p>
      </div>

      <div className="card">
        <div className="card-header">🏘️</div>
        <h3>{language === 'en' ? 'Families Completed' : 'परिवार पूरे'}</h3>
        <p className="card-value">{formatNumber(data.householdsCompleted100Days)}</p>
        <p className="card-description">{language === 'en' ? '100 days of work' : '100 दिन का काम'}</p>
      </div>
    </div>
  );
}

export default PerformanceCards;

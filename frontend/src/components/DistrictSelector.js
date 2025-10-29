import React, { useState } from 'react';
import '../styles/DistrictSelector.css';

function DistrictSelector({ districts, onSelect, language }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const filteredDistricts = districts.filter(d =>
    d.districtName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (district) => {
    setSelectedDistrict(district);
    onSelect(district);
  };

  return (
    <div className="district-selector">
      <input
        type="text"
        placeholder={language === 'en' ? 'Search your district...' : 'अपने जिले को खोजें...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div className="districts-grid">
        {filteredDistricts.map((district) => (
          <button
            key={district.districtCode}
            className={`district-card ${selectedDistrict?.districtCode === district.districtCode ? 'selected' : ''}`}
            onClick={() => handleSelect(district)}
          >
            <span className="district-name">{district.districtName}</span>
          </button>
        ))}
      </div>

      {filteredDistricts.length === 0 && (
        <p className="no-results">{language === 'en' ? 'No districts found' : 'कोई जिला नहीं मिला'}</p>
      )}
    </div>
  );
}

export default DistrictSelector;

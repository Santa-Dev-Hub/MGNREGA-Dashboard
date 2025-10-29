import React, { useState } from 'react';
import '../styles/GeolocationHandler.css';

function GeolocationHandler({ districts, onSelectDistrict, language }) {
  const [locationStatus, setLocationStatus] = useState('idle');
  const [detectedLocation, setDetectedLocation] = useState(null);

  const handleGetLocation = () => {
    setLocationStatus('loading');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Your location: ${latitude}, ${longitude}`);
          
          // For demo purposes, let's suggest a nearby UP district
          // In production, you'd use a reverse geocoding service
          
          // Simple demo logic: suggest different districts based on general location
          let suggestedDistrict = null;
          
          if (latitude >= 26.0 && latitude <= 29.0 && longitude >= 77.0 && longitude <= 84.0) {
            // Rough UP coordinates - show actual detected district
            suggestedDistrict = districts.find(d => d.districtName === 'Lucknow');
            setDetectedLocation(`📍 You seem to be in Uttar Pradesh area`);
          } else {
            // Outside UP - suggest a demo district
            suggestedDistrict = districts.find(d => d.districtName === 'Lucknow');
            setDetectedLocation(`📍 Location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)} (Outside UP - showing Lucknow as demo)`);
          }
          
          if (suggestedDistrict) {
            // Auto-select the suggested district after 2 seconds
            setTimeout(() => {
              console.log('Auto-selecting district:', suggestedDistrict.districtName);
              onSelectDistrict(suggestedDistrict);
            }, 5000);
          }
          
          setLocationStatus('success');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('unsupported');
    }
  };

  return (
    <section className="geolocation-section">
      <h2>{language === 'en' ? 'Auto-Detect Your District' : 'अपने जिले का स्वचालित पता लगाएं'}</h2>
      <p className="geolocation-description">
        {language === 'en' 
          ? 'Let us find your district using your device location (demo mode - will show Lucknow if outside UP)'
          : 'अपने डिवाइस स्थान का उपयोग करके हमें अपना जिला खोजने दें (डेमो मोड)'}
      </p>
      
      <button 
        className={`geo-button status-${locationStatus}`}
        onClick={handleGetLocation}
        disabled={locationStatus === 'loading'}
      >
        {locationStatus === 'idle' && '📍 ' + (language === 'en' ? 'Find My District' : 'मेरा जिला खोजें')}
        {locationStatus === 'loading' && '⏳ ' + (language === 'en' ? 'Getting location...' : 'स्थान प्राप्त कर रहे हैं...')}
        {locationStatus === 'success' && '✓ ' + (language === 'en' ? 'Location found - redirecting...' : 'स्थान मिल गया - रीडायरेक्ट कर रहे हैं...')}
        {locationStatus === 'error' && '✗ ' + (language === 'en' ? 'Could not detect location' : 'स्थान का पता नहीं लगा सकता')}
      </button>

      {detectedLocation && (
        <div className="detected-location">
          <p>{detectedLocation}</p>
          <p style={{fontSize: '0.9em', color: '#666', marginTop: '5px'}}>
            {language === 'en' 
              ? 'Auto-selecting district in 5 seconds...' 
              : '5 सेकंड में जिला चुना जाएगा...'}
          </p>
        </div>
      )}

      {locationStatus === 'unsupported' && (
        <div className="error-message">
          <p>{language === 'en' ? 'Location not supported by your browser' : 'आपका ब्राउज़र लोकेशन सपोर्ट नहीं करता'}</p>
        </div>
      )}
    </section>
  );
}

export default GeolocationHandler;

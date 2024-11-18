import React from 'react';
import '../../styles/components/global/Loading.css'; // Import the CSS file for styling

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingScreen;

import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/landing/JoinBox.css'


function JoinBox() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };
  return (
    <div className="join-section">
      <div>
        <div className="join-text">
          <h1><i>LIA:</i> Tu companion para cumplir tus sueños académicos</h1>
          <p>Únete ya!</p>
        </div>
        <div className="join-button-box">
          <button className="join-button" onClick={handleRedirect}>Unirse</button>
        </div>
      </div>
    </div>
  );
}

export default JoinBox;
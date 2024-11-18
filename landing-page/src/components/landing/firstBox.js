import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/components/landing/FirstBox.css'
import vector1 from '../../assets/vecteezy_online-education-concept-illustration-digital-classroom_10869731 1.png';

const FirstBox = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
      navigate('/login'); // Replace with your target route
  };
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">ESTUDIA<br />SIN ESTRÉS</h1>
          <p className="hero-subtitle">Potencia tu aprendizaje con herramientas IA</p>
          <div className="hero-buttons">
            <button className="join-button" onClick={handleRedirect}>Unirme<br /> ahora</button>
            <span className="interested-text">Estoy interesado</span>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for the image */}
          <div className="image-placeholder"><img src={vector1} alt="Placeholder" /></div>
        </div>
      </div>
    </div>
  )
}

export default FirstBox
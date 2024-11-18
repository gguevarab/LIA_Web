import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/landing/ObjectivesBox.css'

function ObjectivesBox() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <section className="level-up-section">
      <h1 className="level-up-title">SUBE<br />DE<br />NIVEL</h1>
      <div className="level-up-content">
      
        <div className="benefits-ben">
          <p>Alcanza tus metas academicas</p>
          <p>Mejora tus notas</p>
          <p>Aprende a tu ritmo</p>
          <p>Optimiza tu tiempo</p>
        </div>
        <button className="join-button" onClick={handleRedirect}>Unirme ahora</button>
      </div>
    </section>
  );
}

export default ObjectivesBox;
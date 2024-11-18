import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/student.png';
import image2 from '../../assets/books.png';
import image3 from '../../assets/flashcards.png';

import '../../styles/components/landing/WhatIsBox.css';

function WhatIsBox() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="about-lia">
      <h2 className="about-title">¿Qué es LIA?</h2>
      <p className="about-subtitle">
        Es una plataforma con herramientas apoyadas en inteligencia artificial IA
        para apoyar el proceso de aprendizaje de estudiantes universitarios.
      </p>
      <div className="cards-container">
        <div className="card-wib">
          <img src={image1} alt="Placeholder" className='image'/>
          <h3 className="card-title-wib">Examenes de prueba</h3>
          <p className="card-description-wib">
            Pon a prueba tus conocimientos con <em>examenes de prueba</em> que tú mismo puedes generar.
          </p>
        </div>
        <div className="card-wib">
          <img src={image2} alt="Placeholder" className='image'/>
          <h3 className="card-title-wib">Resúmenes</h3>
          <p className="card-description-wib">
            Refuerza conocimiento con <em>explicaciones</em> basadas en el material de tus clases.
          </p>
        </div>
        <div className="card-wib">
          <img src={image3} alt="Placeholder" className='image'/>
          <h3 className="card-title-wib">Flashcards</h3>
          <p className="card-description-wib">
            Desarrolla tu memoria a través de <em>flashcards</em> estudiando los temas para tus examenes.
          </p>
        </div>
      </div>
      <p className="cta-text">
        ¿Qué esperas para unirte a nuestra plataforma y disfrutar de estas <em>herramientas</em>?
      </p>
      <button className="join-button" onClick={handleRedirect}>Unirme ahora</button>
    </div>
  );
}

export default WhatIsBox;
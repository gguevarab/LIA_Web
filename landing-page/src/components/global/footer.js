import React from 'react'
import '../../styles/components/global/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h3>Asistencia</h3>
          <div className="footer-links">
            <div>
              <p>Centro de Ayuda</p>
              <p>Dudas Frecuentes</p>
              <p>Términos y condiciones</p>
              <p>Privacidad</p>
            </div>
            <div>
              <p>Atención al Cliente</p>
              <p>Configuración de cookies</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>2024 Lia</span>
          <div className="social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
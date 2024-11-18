import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/menu/NavbarMenu.css'

function NavbarMenu() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/menu');
  };
  return (
    <nav className="navbar-menu">
      <div className="navbar-logo-menu" onClick={handleRedirect}>LIA</div>
      <div className="navbar-links-menu">
        <a href="#planes">Planes</a>
        <a href="#soporte">Soporte</a>
        <button className="navbar-button-menu" onClick={handleRedirect}>Mis archivos</button>
        <div className="navbar-profile-menu">
            <div className="profile-icon-menu">👤</div>
            <span className="profile-name-menu">María</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarMenu
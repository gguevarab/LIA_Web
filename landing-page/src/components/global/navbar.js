import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/global/Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login'); // Replace with your target route
    };

    return (
        <nav className="navbar-global">
            <div className="navbar-logo">LIA</div>
            <div className="navbar-links">
                <Link to="/">Precios</Link>
                <Link to="/">Soporte</Link>
                <Link to="/">Sobre nosotros</Link>
                <button className="navbar-button" onClick={handleRedirect}>Unirme</button>
            </div>
        </nav>
    );
    
}

export default Navbar;
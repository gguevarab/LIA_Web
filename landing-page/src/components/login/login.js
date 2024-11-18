// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/login/Login.css';
import image from '../../assets/loginStudent.png';

function LoginComponent() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/menu'); // Replace with your target route
    };

    return (
        <div className="login-container">
        <div className="login-illustration">
            <img src={image} alt="Placeholder" />
        </div>
        <div className="login-form">
            <h1 className="login-title">Bienvenido</h1>
            <form>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Ingresa tu email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Ingresa tu contraseña" />
                <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="login-button" onClick={handleRedirect}>Iniciar sesión</button>
            <p className="social-text">O inicia sesión con:</p>
            <div className="social-buttons">
                <button type="button" className="social-button google">Google</button>
                <button type="button" className="social-button facebook">Facebook</button>
            </div>
            </form>
            <p className="register-text">
            Si no tienes cuenta <a href="/register">Regístrate</a>
            </p>
        </div>
        </div>
    );
}

export default LoginComponent;

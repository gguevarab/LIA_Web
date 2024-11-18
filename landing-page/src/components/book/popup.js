import React, { useState } from "react";
import { addGeneration } from "../../services/flaskAPI";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from '../global/loading'
import '../../styles/components/book/Popup.css'

const Popup = ({ onClose, children }) => {

    const [materialName, setMaterialName] = useState('');
    const [description, setDescription] = useState('');
    const [prompt, setPrompt] = useState('Test');
    const [isLoading, setIsLoading] = useState(false);
    const { name } = useParams();

    const navigate = useNavigate();

    const handleRedirectUpload = async () => {
        setIsLoading(true);
        const data = {
            title: materialName,
            description: description,
            prompt: prompt,
            isflashcards: prompt === 'flashcards'
        }
        console.log(data);
        await addGeneration(name, data)
          .then((response) => {
            console.log("Success:", response.data);
            navigate(`/menu/book/${name}/${materialName}?isflashcards=${prompt === 'flashcards'}`);
          })
          .catch((error) => {
            console.error("Error:", error.response?.data || error.message);
          });
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button onClick={onClose} className="close-button">Close</button>
                <h2>Nuevo Material</h2>
                <input 
                    type="text" 
                    placeholder="Nombre del material" 
                    className="input-field"
                    onChange={(e) => setMaterialName(e.target.value)}
                />
                <textarea
                    type="text" 
                    placeholder="Descripción del material" 
                    className="large-input-field"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="dropdown">
                    <select className="dropdown-select" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                        <option value="test">Test de practica</option>
                        <option value="summary">Resumen</option>
                        <option value="eli">ELI5</option>
                        <option value="flashcards">Flashcards</option>
                    </select>
                </div>
                {children}
                <button className="generate-button" onClick={handleRedirectUpload}>Generar</button>
            </div>
            {isLoading && <LoadingScreen />}
        </div>
    );
}

export default Popup
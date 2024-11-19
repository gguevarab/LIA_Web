import React, { useRef, useState } from 'react'
import { FaArrowLeft, FaUpload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { addMaterial, addGeneration } from '../../services/flaskAPI'
import LoadingScreen from '../global/loading'
import '../../styles/components/upload/Upload.css'

function UploadComponent() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [prompt, setPrompt] = useState('Test'); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [materialName, setMaterialName] = useState('');
    const [description, setDescription] = useState('');
    const [bookName, setBookName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleRedirectMenu = () => {
        navigate('/menu');
    };

    const handleRedirectUpload = async () => {
        setIsLoading(true);
        await addMaterial(bookName, selectedFile);
        const data = {
            title: materialName,
            description: description,
            prompt: prompt,
            isflashcards: prompt === 'flashcards'
        }
        console.log(data);
        await addGeneration(bookName, data)
          .then((response) => {
            console.log("Success:", response.data);
            navigate(`/menu/book/${bookName}/${materialName}?isflashcards=${prompt === 'flashcards'}`);
          })
          .catch((error) => {
            console.error("Error:", error.response?.data || error.message);
          });
    };

    return (
        <div className="upload-material-container" >
            <button className="back-button" onClick={handleRedirectMenu}>
                <FaArrowLeft className="back-icon" />
                Regresar
            </button>

            <div className="upload-area" onClick={handleUploadClick} >
                <FaUpload className="upload-icon" />
                <p>{selectedFile ? selectedFile.name : "Subir archivo"}</p>
            </div>

            {/* Hidden file input for triggering the upload */}
            <input
                type="file"
                accept='application/pdf'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <input 
                type="text" 
                placeholder="Nombre del libro" 
                className="input-field"
                onChange={(e) => setBookName(e.target.value)}
            />

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
                    <option value="Test">Test de practica</option>
                    <option value="Summary">Resumen</option>
                    <option value="ELI5">ELI5</option>
                    <option value="Flashcards">Flashcards</option>
                </select>
            </div>

            <button className="generate-button" onClick={handleRedirectUpload}>Generar</button>

            {isLoading && <LoadingScreen />}
                    
        </div>
    )
}

export default UploadComponent
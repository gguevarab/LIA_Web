import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMaterials } from '../../services/flaskAPI';
import '../../styles/components/book/Book.css'; // Import the CSS file

const BookComponent = ({ onSubmit }) => {
  const [materials, setMaterials] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await getMaterials(name);
      setMaterials(response.data);
    };
    fetchMaterials();
  }, [name]);

  const handleGenerate = () => {
    const newMaterial = {
      title: materials.length % 2 === 0 ? 'ELI5' : 'Examen de Prueba',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      date: new Date().toLocaleDateString('es-ES'),
    };
    setMaterials([...materials, newMaterial]);
  };

  const handleRedirectGeneration = (title, isflashcards) => {
    navigate(`${title}?isflashcards=${isflashcards}`);
  };

  return (
    <div className="container">
      <h1 className="header">{name}</h1>
      <div className="formSection">
        <select className="select">
          <option>Tipo de generación</option>
          <option>ELI5</option>
          <option>Examen de Prueba</option>
        </select>
        <button onClick={handleGenerate} className="button">Generar</button>
      </div>

      <div className="materialList">
        {materials.map((material, index) => (
          <div key={index} className="materialCard" onClick={() => handleRedirectGeneration(material.title, String(material.isflashcards))}>
            <h2>{material.title}</h2>
            <p>{material.description}</p>
            <span>{material.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookComponent;

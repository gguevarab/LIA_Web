import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMaterials } from '../../services/flaskAPI';
import Popup from '../book/popup';
import '../../styles/components/book/Book.css'; // Import the CSS file

const BookComponent = ({ onSubmit }) => {
  const [materials, setMaterials] = useState([]);
  const { name } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await getMaterials(name);
      setMaterials(response.data);
    };
    fetchMaterials();
  }, [name]);

  const handleRedirectGeneration = (title, isflashcards) => {
    navigate(`${title}?isflashcards=${isflashcards}`);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h1 className="header">{name}</h1>
      <div className="formSection">
        <button onClick={handleOpenPopup} className="button">Crear nuevo material</button>
      </div>
        {showPopup && (
          <Popup onClose={handleClosePopup}></Popup>
        )}
      <div className="materialList">
        {materials.map((material, index) => (
          <div key={index} className="materialCard" onClick={() => handleRedirectGeneration(material.title, String(material.isflashcards))}>
            <h2>{material.title}</h2>
            <p>{material.description}</p>
            <span>{material.date} - {material.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookComponent;

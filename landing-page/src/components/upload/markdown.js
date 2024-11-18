import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/components/upload/Markdown.css';
import { getGeneration } from '../../services/flaskAPI';

function MarkdownComponent() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [generation, setGeneration] = useState('');
  const [isflashcards, setIsFlashed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { name, title } = useParams();

  useEffect(() => {
    const fetchGeneration = async () => {
      const response = await getGeneration(name, title);
      setGeneration(response.data);
    };
    fetchGeneration();
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('isflashcards') === 'true') {
      setIsFlashed(true);
    }
    if (isflashcards) {
      translateFlashcards();
    }
    console.log(isflashcards);
  }, [name, title, generation]);

  const handleRedirectMenu = () => {
    navigate(-1);
  };

  const translateFlashcards = () => {
    try {
      const content = generation;
      const lines = content.split('\n').filter((line) => line.trim() !== '');
      const flashcardsArray = lines.map((line) => {
        const parts = line.split(':');
        const term = parts[0].trim();
        const definition = parts.slice(1).join(':').trim();
        return { term, definition };
      });
      setFlashcards(flashcardsArray);
      setCurrentCard(0);
      setIsFlipped(false);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };

  const handleNext = () => {
    if (flashcards.length > 0) {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (flashcards.length > 0) {
      setCurrentCard(
        (prev) => (prev - 1 + flashcards.length) % flashcards.length
      );
      setIsFlipped(false);
    }
  };

  return (
    <div className="markdown-container">
      <button className="back-button" onClick={handleRedirectMenu}>
        <FaArrowLeft className="back-icon" />
        Regresar
      </button>
      <h1>{title}</h1>
      {isflashcards ? (
        flashcards.length > 0 ? (
          <div>
            <div
              className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flashcard-content">
                <div className="flashcard-front">
                  <h3>{flashcards[currentCard].term}</h3>
                </div>
                <div className="flashcard-back">
                  <p>{flashcards[currentCard].definition}</p>
                </div>
              </div>
            </div>
            <div className="flashcard-buttons">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        ) : (
          <p>No flashcards available.</p>
        )
      ) : (
        <div className="markdown-content">
          <ReactMarkdown>{generation}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default MarkdownComponent;

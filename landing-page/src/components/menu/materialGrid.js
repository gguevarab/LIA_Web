import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/menu/MaterialGrid.css'
import { getBooks } from '../../services/flaskAPI'; 

function MaterialGrid() {
    const [books, setBooks] = React.useState([]);

    useEffect(() => {
        getBooks().then((response) => {
          setBooks(response.data);
        });
      }, []);

    const navigate = useNavigate();    

    const handleRedirectUpload = () => {
        navigate('/menu/upload');
    };

    const handleRedirectMaterial = (book) => {
        navigate('/menu/book/' + book);
    };

    return (
        <div className="material-grid">
            {/* Add Material Card */}
            <div className="material-card add-material" onClick={handleRedirectUpload}>
                <div className="add-icon">+</div>
                <p>Agregar Material</p>
            </div>

            {/* Material Cards */}
            {books.map((book) => (
                <div key={book} className="material-card" onClick={() => handleRedirectMaterial(book)}>
                <div className="material-icon">📄</div>
                <p>{book}</p>
                <div className="options-icon">⋮</div>
                </div>
            ))}
        </div>
  )
}

export default MaterialGrid
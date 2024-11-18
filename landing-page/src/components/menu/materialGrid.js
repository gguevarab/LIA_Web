import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/menu/MaterialGrid.css' 

function MaterialGrid() {
    const navigate = useNavigate();
    const materials = [
        { id: 1, title: 'Material1' },
        { id: 2, title: 'Material2' },
        { id: 3, title: 'Material3' },
        { id: 4, title: 'Material4' },
      ];

    const handleRedirect = () => {
        navigate('/menu/upload');
    };

    return (
        <div className="material-grid">
            {/* Add Material Card */}
            <div className="material-card add-material" onClick={handleRedirect}>
                <div className="add-icon">+</div>
                <p>Agregar Material</p>
            </div>

            {/* Material Cards */}
            {materials.map((material) => (
                <div key={material.id} className="material-card">
                <div className="material-icon">📄</div>
                <p>{material.title}</p>
                <div className="options-icon">⋮</div>
                </div>
            ))}
        </div>
  )
}

export default MaterialGrid
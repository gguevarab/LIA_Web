import React from 'react'
import '../../styles/components/landing/ReviewsBox.css'

const reviewsBox = () => {
  return (
    <section className="user-reviews">
      <div>
        <h2 className="reviews-title">Mira las opiniones de nuestros usuarios</h2>
        <div className="reviews-container">
          <div className="review-card">
            <p className="review-quote">“Buena idea con potencial”</p>
            <p className="review-author">Alonso Hernandez</p>
            <p className="review-text">
              La app esta muy buena y tiene futuro. Hay cosas que pulir pero considero que me es útil hipotéticamente.
            </p>
          </div>
          <div className="review-card">
            <p className="review-quote">“Me ahorro tiempo”</p>
            <p className="review-author">Brayan Muñoz</p>
            <p className="review-text">
              No frecuento mucho aplicaciones de este estilo, pero no niego que resulta muy útil cuando hay poco tiempo.
            </p>
          </div>
          <div className="review-card">
            <p className="review-quote">“Flashcards &lt;3”</p>
            <p className="review-author">Natalí Bohorquez</p>
            <p className="review-text">
              Le faltan funcionalidades, pero en general es una herramienta muy útil. Me gusta la idea de las flashcards.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default reviewsBox
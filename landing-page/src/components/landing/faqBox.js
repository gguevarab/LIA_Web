import React from 'react'
import FaqCard from './faqCard';
import '../../styles/components/landing/FaqBox.css'

const faqBox = () => {

  const faqs = [
    {
      question: '¿Cómo funciona?',
      answer: 'Solo tienes que añadir contenido de tus clases y la IA se encargará de hacer la magia y ofrecerte material de estudio personalizado.',
    },
    {
      question: '¿Qué IA utiliza?',
      answer: 'En el contexto de LIA, se utiliza el poder de GPT-4.0. Se trata de uno de los modelos más poderosos actualmente. ¡Estás en buenas manos!',
    },
    {
      question: '¿Es esta una versión oficial?',
      answer: 'La aplicación sigue en proceso de desarrollo. Sin embargo, sus funcionalidades y servicios se expandirán en el futuro.',
    },
    {
      question: '¿Cómo accedo?',
      answer: 'Solamente tienes que presionar el botón de unirse y estarás listo para optimizar tu estudio.',
      buttonText: 'Unirse',
    },
  ];

  return (
    <section className="faq-box">
      <div className="faq-section">
        <h1>FAQ</h1>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FaqCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              buttonText={faq.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default faqBox
import React from 'react';

const FaqCard = ({ question, answer, buttonText }) => {
  return (
    <div className="faq-card">
      <h3>{question}</h3>
      <p>{answer}</p>
      {buttonText && <button>{buttonText}</button>}
    </div>
  );
};

export default FaqCard;

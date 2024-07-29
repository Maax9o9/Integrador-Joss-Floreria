
import React from 'react';
import './Card.css';

const Card = ({ image, text }) => {
  return (
    <div className="card-container">
      <img src={image} alt="card" className="card-image" />
      <p className="card-text">{text}</p>
    </div>
  );
};

export default Card;

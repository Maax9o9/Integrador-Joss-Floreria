import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import Button from '../Button/button';
import Card from '../Organisms/Card';
import './Home.css';
import cardhome1 from '../../assets/images/cardhome1.jpg';
import cardhome2 from '../../assets/images/cardhome2.jpg';
import cardhome3 from '../../assets/images/cardhome3.jpg';
import flecha from '../../assets/icons/flecha.png';

const Home = () => {
  const cardsData = [
    {
      image: cardhome1,
      text: 'Flores eternas para ocasiones especiales',
    },
    {
      image: cardhome2,
      text: 'Diferentes colores para elegir!',
    },
    {
      image: cardhome3,
      text: 'Pedidos personalizados',
    },
  ];

  const handleArrowClick = () => {
    const cardsSection = document.getElementById('cards-container');
    if (cardsSection) {
    
      window.scrollTo({
        top: cardsSection.offsetTop - 100, 
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="home-container">
      <Carousel />
      <img
        src={flecha}
        alt="arrow"
        className="arrow"
        onClick={handleArrowClick}
      />
      <div id="cards-container" className="cards-container">
        {cardsData.map((card, index) => (
          <Card key={index} image={card.image} text={card.text} />
        ))}
      </div>
      <div className="button-container">
        <Link to="/catalog">
          <Button type="button">
            Ver catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

import imagen1 from '../../assets/carousel_imgs/imagen1.jpg';
import imagen2 from '../../assets/carousel_imgs/imagen2.jpg';
import imagen3 from '../../assets/carousel_imgs/imagen3.jpg';
import imagen4 from '../../assets/carousel_imgs/imagen4.jpg';

const images = [
    imagen1,
    imagen2,
    imagen3,
    imagen4,
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    lazyLoad: 'ondemand',
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <div className="blur-container">
              <div className="blurred-image" style={{ backgroundImage: `url(${image})` }} />
              <img src={image} alt={`Descripción de la imagen ${index}`} className="carousel-image" />
              <div className="blurred-image" style={{ backgroundImage: `url(${image})` }} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

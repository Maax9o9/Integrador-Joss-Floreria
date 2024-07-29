// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 
import './index.css';

const Header = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h1>Joss Florería</h1>
      </div>
      <NavBar />
      <div className="header-icons" data-animation="diagonal">
        <button onClick={handleSearchClick} className="header-icon-button">
          <img src="/src/assets/icons/search_N.png" alt="buscar" className="header-icon" />
        </button>
        <Link to="/login">
          <img src="/src/assets/icons/login_N.png" alt="Iniciar sesión" className="header-icon" />
        </Link>
        <Link to="/reserved-products">
          <img src="/src/assets/icons/shopping_cart_N.png" alt="Carrito" className="header-icon" />
        </Link>
        <Link to="/favourite-products">
          <img src="/src/assets/icons/favouriteB.png" alt="Favoritos" className="header-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;

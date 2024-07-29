import React from 'react';
import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <ul className="footer-list">
          <li>Contacto: <span>+52 9999999999</span></li>
          <li>Métodos de Pago: <span>Efectivo y terminal</span></li>
        </ul>
      </div>
      <div className="footer-icons">
        <a href="https://www.instagram.com/rosaseternas_joss/" target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/icons/instagram.png" alt="Instagram" className="footer-icon" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61555833650471&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/icons/facebook.png" alt="Facebook" className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

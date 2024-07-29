import React from 'react';
import NavItem from '../header/NavItem';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBarDeliveryman = () => {
  const navItems = [
    { href: '/delivery-backorders', label: 'Pedidos Pendientes' }, 
  ];

  return (
    <nav className="delivery-header">
      <div className="delivery-header-logo">
        <h1>Joss Florería</h1>
      </div>
      <div className="delivery-nav-container">
        <ul className="nav-bar-deliveryman">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </ul>
      </div>
      <div className="delivery-header-icons">
      <Link to="/login">
          <img src="/src/assets/icons/login_N.png" alt="Inventario" className="delivery-header-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBarDeliveryman;

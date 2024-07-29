import React from 'react';
import NavItem from '../header/NavItem';
import { Link } from 'react-router-dom';
import './NavBarAdmin.css';

const NavBarAdmin = () => {
  const navItems = [
    { href: '/admin-inventory', label: 'Agregar al Inventario' },
    { href: '/admin-pm', label: 'Inventario' },
    { href: '/admin-deliveryman', label: 'Administrar Repartidores' },
    { href: '/admin-dl', label: 'Repartidores' },
    {href : '/admin-order', label:'Status de pedidos'}
  ];

  return (
    <nav className="admin-header">
      <div className="admin-header-logo">
        <h1>Joss Florería</h1>
      </div>
      <div className="admin-nav-container">
        <ul className="nav-bar-admin">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </ul>
      </div>
      <div className="admin-header-icons">
      <Link to="/login">
          <img src="/src/assets/icons/login_N.png" alt="Inventario" className="admin-header-icon" />
        </Link>
        <Link to="/admin-backorders">
          <img src="/src/assets/icons/notificacion.png" alt="Inventario" className="admin-header-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBarAdmin;

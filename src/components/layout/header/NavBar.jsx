
import React from 'react';
import NavItem from './NavItem';

const NavBar = () => {
  const navItems = [

    { href: 'acerca-de-nosotros', label: 'Acerca de Nosotros' },
    { href: 'apartar-ahora', label: 'Aparta ahora' },
    { href: '/', label: 'Inicio' },
    { href: 'catalog', label: 'Catalogo' },
    { href: 'custom', label: 'Arma tu Ramo' }

  ];

  return (
    <ul className="nav-bar">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  );
};

export default NavBar;

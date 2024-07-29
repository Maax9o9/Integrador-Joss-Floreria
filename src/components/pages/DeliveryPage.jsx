import React from 'react';
import NavBarDeliveryman from '../layout/headerDeliveryman/NavBarDrliveryman';
import { Outlet } from 'react-router-dom';
import './Deliverypage.css'; 

const AdminPage = () => {
  return (
    <div className="delivery-container">
      <header className="delivery-header">
        <h1>Área de repartidores</h1>
        <NavBarDeliveryman />
      </header>
      <main className="delivery-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;

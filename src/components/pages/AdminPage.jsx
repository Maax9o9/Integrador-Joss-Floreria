import React from 'react';
import NavBarAdmin from '../layout/headerAdmin/NavBarAdmin';
import { Outlet } from 'react-router-dom';
import './AdminPage.css'; 

const AdminPage = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Área de Administración</h1>
        <NavBarAdmin></NavBarAdmin>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;

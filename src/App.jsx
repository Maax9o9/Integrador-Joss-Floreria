import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/layout/footer'; 
import Header from './components/layout/header';
import HeaderAdmin from './components/layout/headerAdmin/NavBarAdmin';
import HeaderDelivery from './components/layout/headerDeliveryman/NavBarDrliveryman';

const App = () => {
  const location = useLocation();
  
  const renderHeader = () => {
    if (location.pathname.startsWith('/admin')) {
      return <HeaderAdmin />;
    } else if (location.pathname.startsWith('/delivery')) {
      return <HeaderDelivery />;
    } else {
      return <Header />;
    }
  };

  return (
    <div>
      {renderHeader()}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

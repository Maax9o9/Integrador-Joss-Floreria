import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBackorders.css';

const AdminBackorders = () => {
  const navigate = useNavigate();
  const [backorders, setBackorders] = useState([]);

  useEffect(() => {
    const fetchBackorders = async () => {
      try {
        const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/requests/', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredBackorders = data.filter(order =>
            [2, 3, 4].includes(order.status_id)
          );
          setBackorders(filteredBackorders);
        } else {
          console.error('Error al obtener pedidos pendientes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener pedidos pendientes:', error);
      }
    };

    fetchBackorders();
  }, []);

  const handleNotificationClick = (order) => {
    navigate('/admin-order', { state: { order } });
  };

  return (
    <div className="admin-backorders-container">
      {backorders.length === 0 ? (
        <p>No hay pedidos pendientes</p>
      ) : (
        backorders.map((order) => (
          <div 
            key={order.id} 
            className="notification-card" 
            onClick={() => handleNotificationClick(order)}
          >
            <div className="icon-container">
              <img src="/src/assets/icons/alert.png" alt="Urgent" className="urgent-icon" />
            </div>
            <div className="notification-details">
              <p>Fecha de Creación: {order.created_at}</p>
              <p>Fecha de Entrega: {order.request_date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBackorders;

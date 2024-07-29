import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AdminDeliveryCards.css';
import Button from '../Button/button'

const AdminDeliveryCards = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem('token');

  const fetchDeliveryMen = async () => {
    try {
      const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/customer/delivery', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching delivery men');
      }

      const data = await response.json();
      console.log('Repartidores obtenidos:', data);

      setDeliveryMen(data);
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener los repartidores: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchDeliveryMen();
  }, []);

  const handleDeleteDeliveryMan = async (id) => {
    try {
      const response = await fetch(`https://jossfloreriaapi.integrador.xyz/api/customer/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting delivery man');
      }

      MySwal.fire({
        icon: 'success',
        title: 'Borrado',
        text: 'Repartidor borrado con éxito.',
      });

      setDeliveryMen((prevDeliveryMen) =>
        prevDeliveryMen.filter((deliveryMan) => deliveryMan.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al borrar el repartidor: ${error.message}`,
      });
    }
  };

  return (
    <div className="admin-dm-container">
      <h2>Gestión de Repartidores</h2>
      <div className="deliveryman-cards">
        {deliveryMen.length > 0 ? (
          deliveryMen.map((deliveryMan) => (
            <div key={deliveryMan.id} className="deliveryman-card">
              <h3>{deliveryMan.first_name} {deliveryMan.last_name}</h3>
              <p>Correo Electrónico: {deliveryMan.email}</p>
              <p>Número de Teléfono: {deliveryMan.phone_number}</p>
              <p>Dirección: {deliveryMan.address}</p>
              <Button
                onClick={() => handleDeleteDeliveryMan(deliveryMan.id)}
                className="delete-button"
              >
                Borrar
              </Button>
            </div>
          ))
        ) : (
          <p>No hay repartidores disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDeliveryCards;

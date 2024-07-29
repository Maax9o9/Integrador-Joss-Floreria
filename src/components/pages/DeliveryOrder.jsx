import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './DeliveryOrder.css';

const DeliveryOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [status, setStatus] = useState(order ? order.status : null);
  const [orderId, setOrderId] = useState(order ? order.id : null);

  useEffect(() => {
    if (order) {
      setOrderId(order.id);
    }
  }, [order]);

  const handleStatusChange = async () => {
    if (status === 'Entregado') {
      Swal.fire({
        icon: 'info',
        title: 'El pedido ya está entregado y no puede cambiar de estado.',
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: `¿Estás seguro de que deseas cambiar el estado a "Entregado"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(
          `https://jossfloreriaapi.integrador.xyz/api/requests/${orderId}/status/delivery`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ status_id: 5 }),
          }
        );

        console.log(
          `Respuesta de la solicitud PATCH: ${response.status} ${response.statusText}`
        );

        if (response.ok) {
          setStatus('Entregado');
          Swal.fire({
            icon: 'success',
            title: 'El estado ha cambiado a "Entregado".',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Estado actualizado a: Entregado');
        } else {
          const errorText = await response.text();
          console.error('Error al actualizar el estado del pedido:', errorText);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el estado del pedido.',
            text: errorText,
          });
        }
      } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el estado del pedido.',
        });
      }
    }
  };

  return (
    <div className="delivery-order-container">
      <h1 className="delivery-order-title">Detalles del Pedido</h1>
      {order ? (
        <div className="order-content">
          <img
            src="/path/to/your/image.jpg"
            alt="Producto"
            className="product-image"
          />
          <div className="order-details">
            <p>Nombre del Cliente: {order.customer_name}</p>
            <p>Precio del pedido: {order.price}</p>
            <p>Fecha elegida: {order.date}</p>
            <p>Dirección del Cliente: {order.address}</p>
            <p>Teléfono del Cliente: {order.phone}</p>
            <p>Estatus: {status}</p>
            <div className="status-buttons">
              <button
                className={`status-button entregado ${
                  status === 'Entregado' ? 'active' : ''
                }`}
                onClick={handleStatusChange}
                disabled={status === 'Entregado'}
              >
                Entregado
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del pedido...</p>
      )}
    </div>
  );
};

export default DeliveryOrder;

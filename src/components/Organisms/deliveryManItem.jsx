import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './deliveryManItem.css';
import Input from '../Input/input';

const DeliveryManItem = ({ deliveryMan, onSave, onDelete }) => {
  const [fullName, setFullName] = useState(deliveryMan.fullName);
  const [phoneNumber, setPhoneNumber] = useState(deliveryMan.phoneNumber);
  const [username, setUsername] = useState(deliveryMan.username);
  const [password, setPassword] = useState(deliveryMan.password);
  const MySwal = withReactContent(Swal);

  const handleSave = async () => {
    if (!fullName || !phoneNumber || !username || !password) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos deben estar llenos.',
      });
      return;
    }

    try {
      const response = await fetch('https://jossfloreriaapi.integrador.xyz/Api//deliverymen', {
        method: deliveryMan.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token de autenticación si es necesario
        },
        body: JSON.stringify({
          id: deliveryMan.id, // solo si es actualización
          fullName,
          phoneNumber,
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos del repartidor');
      }

      const data = await response.json();
      onSave(data); // Llamada al callback onSave con los datos actualizados
      MySwal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Datos del repartidor guardados con éxito.',
      });
    } catch (error) {
      console.error('Error al guardar los datos del repartidor:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleDelete = async () => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`URL_DE_TU_API/deliverymen/${deliveryMan.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token de autenticación si es necesario
            },
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el repartidor');
          }

          onDelete(deliveryMan.id); // Llamada al callback onDelete con el id del repartidor eliminado
          MySwal.fire(
            'Eliminado!',
            'El repartidor ha sido eliminado.',
            'success'
          );
        } catch (error) {
          console.error('Error al eliminar el repartidor:', error);
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      }
    });
  };

  return (
    <div className="deliveryman-item">
      <div className="deliveryman-details">
        <label>
          Nombre Completo:
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Número de Teléfono:
          <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Nombre de Usuario:
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="deliveryman-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleDelete}>Eliminar Repartidor</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManItem;

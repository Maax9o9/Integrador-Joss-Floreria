import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '../Button/button';
import './AdminDeliveryMan.css';

const AdminDeliveryMan = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const MySwal = withReactContent(Swal);

  const handleAddDeliveryMan = () => {
    const timestamp = new Date().toISOString();
    setDeliveryMen([
      ...deliveryMen,
      {
        id: Date.now(),
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        created_at: timestamp,
        created_by: 'admin', 
        updated_at: timestamp,
        updated_by: 'admin', 
        deleted: false,
        role_id: 3
      }
    ]);
  };

  const handleSaveDeliveryMan = async (index) => {
    const deliveryMan = deliveryMen[index];
    deliveryMan.updated_at = new Date().toISOString();
    deliveryMan.updated_by = 'admin'; 

    try {
      const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryMan),
      });

      if (response.ok) {
        MySwal.fire('Guardado!', 'El repartidor ha sido guardado.', 'success');
      } else {
        throw new Error('Error al guardar el repartidor');
      }
    } catch (error) {
      MySwal.fire('Error!', error.message, 'error');
    }
  };

  const handleDeleteDeliveryMan = (index) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const newDeliveryMen = deliveryMen.filter((_, i) => i !== index);
        setDeliveryMen(newDeliveryMen);
        MySwal.fire('Borrado!', 'El repartidor ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <div className="admin-deliveryman">
      {deliveryMen.length === 0 ? (
        <p className="empty-deliveryman">No hay repartidores agregados</p>
      ) : (
        deliveryMen.map((deliveryMan, index) => (
          <div key={deliveryMan.id} className="deliveryman-item">
            <div className="deliveryman-details">
              <label>
                Nombre
                <input type="text" name="first_name" value={deliveryMan.first_name} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].first_name = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Nombre" />
              </label>
              <label>
                Apellido
                <input type="text" name="last_name" value={deliveryMan.last_name} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].last_name = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Apellido" />
              </label>
              <label>
                Correo Electrónico
                <input type="email" name="email" value={deliveryMan.email} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].email = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Correo Electrónico" />
              </label>
              <label>
                Contraseña
                <input type="password" name="password" value={deliveryMan.password} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].password = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Contraseña" />
              </label>
              <label>
                Número de Teléfono
                <input type="text" name="phone_number" value={deliveryMan.phone_number} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].phone_number = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Número de Teléfono" />
              </label>
              <label>
                Dirección
                <input type="text" name="address" value={deliveryMan.address} onChange={(e) => {
                  const newDeliveryMen = [...deliveryMen];
                  newDeliveryMen[index].address = e.target.value;
                  setDeliveryMen(newDeliveryMen);
                }} placeholder="Dirección" />
              </label>
            </div>
            <div className="deliveryman-actions">
              <Button onClick={() => handleSaveDeliveryMan(index)}>Guardar</Button>
              <Button onClick={() => handleDeleteDeliveryMan(index)}>Eliminar</Button>
            </div>
          </div>
        ))
      )}
      <Button onClick={handleAddDeliveryMan}>Agregar Repartidor</Button>
    </div>
  );
};

export default AdminDeliveryMan;
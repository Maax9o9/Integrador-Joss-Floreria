import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/button.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity] = useState(1); 
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date) {
      console.log("Fecha seleccionada:", date);
      setSelectedDate(date);
    } else {
      console.log("La fecha seleccionada es nula o inválida.");
    }
  };

  const handleBuy = async () => {
    if (!selectedDate || quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona una fecha y una cantidad válida.',
      });
      return;
    }

    if (!(selectedDate instanceof Date) || isNaN(selectedDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Fecha',
        text: 'La fecha seleccionada no es válida.',
      });
      return;
    }

    try {
      const formattedDate = selectedDate.toISOString();
      const requestData = {
        status_id: 2,
        request_date: formattedDate, 
      };

      console.log('Enviando solicitud para actualizar el estado del producto:', {
        url: `https://jossfloreriaapi.integrador.xyz/api/requests/${product.id}/status`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestData),
      });

      const response = await fetch(
        `https://jossfloreriaapi.integrador.xyz/api/requests/${product.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log('Respuesta del servidor:', await response.json());
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada con éxito',
          text: `Fecha seleccionada: ${selectedDate.toLocaleDateString()}`,
        }).then(() => {
          navigate('/apartar-ahora');
        });
      } else {
        console.error(
          'Error en la respuesta del servidor:',
          response.status,
          await response.text()
        );
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al apartar el producto.',
        });
      }
    } catch (error) {
      console.error('Error al apartar producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al apartar el producto.',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jossfloreriaapi.integrador.xyz/api/requests/${product.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        console.log('Respuesta del servidor:', await response.json());
        Swal.fire({
          icon: 'success',
          title: 'Solicitud eliminada',
          text: 'La solicitud ha sido eliminada exitosamente.',
        }).then(() => {
          
          navigate('/productos'); 
        });
      } else {
        console.error(
          'Error en la respuesta del servidor:',
          response.status,
          await response.text()
        );
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar la solicitud.',
        });
      }
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar la solicitud.',
      });
    }
  };

  return (
    <div className="product-card">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-price"><span className="label">Precio:</span> {product.price}</p>
      <div className="product-date-picker">
        <label>
          <span className="label">Fechas disponibles:</span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccionar fecha"
            className="custom-datepicker"
            minDate={new Date(new Date().setDate(new Date().getDate() + 3))}
          />
        </label>
      </div>
      <div className="product-quantity">
        <label>
          <span className="label">Cantidad:</span>
          <p>{quantity}</p>
        </label>
      </div>
      <div className="product-actions">
        <Button text="Apartar" onClick={handleBuy}>
          Apartar
        </Button>
        <Button text="Eliminar" onClick={handleDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './ReservedProducts.css';

const ReservedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para acceder a esta funcionalidad.',
        showConfirmButton: false,
        timer: 1300,
      }).then(() => {
        window.location.href = '/login';
      });
      return;
    }

    const fetchProducts = async () => {
      const id = 1;
      try {
        const response = await fetch(
          `https://jossfloreriaapi.integrador.xyz/api/requests/status/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCancelProduct = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No, mantener',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://jossfloreriaapi.integrador.xyz/api/requests/${id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
            Swal.fire('Cancelado!', 'El producto ha sido cancelado.', 'success');
          } else {
            Swal.fire(
              'Error!',
              'Hubo un problema al cancelar el producto.',
              'error'
            );
          }
        } catch (error) {
          console.error('Error al cancelar producto:', error);
          Swal.fire(
            'Error!',
            'Hubo un problema al cancelar el producto.',
            'error'
          );
        }
      }
    });
  };

  const handleBuyProduct = async (id) => {
    try {
      const requestData = { status_id: 2 };

      console.log(
        'Enviando solicitud para actualizar el estado del producto:',
        {
          url: `https://jossfloreriaapi.integrador.xyz/api/requests/${id}/status`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const response = await fetch(
        `https://jossfloreriaapi.integrador.xyz/api/requests/${id}/apartar`,
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
        Swal.fire('¡Apartado realizado!', 'Has apartado el producto.', 'success').then(() => {
          navigate('/apartar-ahora');
        });
      } else {
        console.error('Error en la respuesta del servidor:', await response.text());
        Swal.fire('Error!', 'Hubo un problema al apartar el producto.', 'error');
      }
    } catch (error) {
      console.error('Error al apartar producto:', error);
      Swal.fire('Error!', 'Hubo un problema al apartar el producto.', 'error');
    }
  };

  return (
    <div className="reserved-products">
      {products.length === 0 ? (
        <p>Carrito de apartados vacío</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <p>Nombre: {product.name}</p>
              <p>Precio: {product.price}</p>
              <p>Cantidad: {product.quantity}</p>
              <Button
                className="button-cancel"
                onClick={() => handleCancelProduct(product.id)}
              >
                Cancelar apartado
              </Button>
              <Button
                className="button-buy"
                onClick={() => handleBuyProduct(product.id)}
              >
                Apartar
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservedProducts;

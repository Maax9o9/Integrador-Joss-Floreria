import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './FavouriteProducts.css';

const FavouriteProducts = () => {
  const [products, setProducts] = useState([]);

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

    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const favorites = await response.json();
          console.log('Favorites fetched:', favorites); 
          setProducts(favorites);
        } else {
          console.error('Error al obtener favoritos');
        }
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    fetchFavorites();
  
  }, []);

  const handleRemoveFavourite = async (favorite_id) => {
    console.log('Removing favorite with favorite_id:', favorite_id); // Debug line
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, mantener',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://jossfloreriaapi.integrador.xyz/api/favorites/${favorite_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            setProducts(products.filter((product) => product.favorite_id !== favorite_id));
            Swal.fire('Eliminado!', 'El producto ha sido eliminado de favoritos.', 'success');
          } else {
            console.error('Error al eliminar el favorito');
          }
        } catch (error) {
          console.error('Error al eliminar el favorito:', error);
        }
      }
    });
  };

  const handleOrderAgain = (bouquet_id) => {
    Swal.fire('Redirigir', 'Redirigir a la vista de pedido', 'success');
  };

  return (
    <div className="favourite-products">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.favorite_id} className="product-item">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <p>Nombre: {product.name}</p>
              <p>Precio: ${product.price}</p>
              <div className="product-actions">
                <Button className="button-order-again" onClick={() => handleOrderAgain(product.bouquet_id)}>
                  Pedir de nuevo
                </Button>
                <Button className="button-remove-favourite" onClick={() => handleRemoveFavourite(product.favorite_id)}>
                  Eliminar de favoritos
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes productos favoritos en este momento.</p>
      )}
    </div>
  );
};

export default FavouriteProducts;

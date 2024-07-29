import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const id = 2;
      try {
        const response = await fetch(`https://jossfloreriaapi.integrador.xyz/api/requests/status/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.filter(product => product.status_id === 2)); // Filtrar productos por status_id 2
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (productId) => {
    // Aquí deberías implementar la lógica para hacer la compra, como una solicitud POST a una API
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: 'El producto ha sido comprado.',
      showConfirmButton: false,
      timer: 1500,
    });

    // Elimina el producto de la vista después de la compra
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="buy-now-page">
      {loading ? (
        <p className="loading-message">Cargando productos...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard product={product} onBuy={() => handleBuy(product.id)} />
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">No hay pedidos apartados.</p>
      )}
    </div>
  );
};

export default BuyNowPage;

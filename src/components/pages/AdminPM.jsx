import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AdminPM.css';
import Button from './../Button/button';

const AdminPM = () => {
  const [flowers, setFlowers] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem('token');

  const fetchFlowers = async () => {
    try {
      const response = await fetch(
        'https://jossfloreriaapi.integrador.xyz/api/flowers/flowers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching flowers');
      }

      const data = await response.json();
      console.log('Flores obtenidas:', data);
      setFlowers(data);
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener las flores: ${error.message}`,
      });
    }
  };

  const fetchBouquets = async () => {
    try {
      const response = await fetch(
        'https://jossfloreriaapi.integrador.xyz/api/bouquets',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching bouquets');
      }

      const data = await response.json();
      console.log('Ramos obtenidos:', data);
      setBouquets(data);
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener los ramos: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchFlowers();
    fetchBouquets();
  }, []);

  const handleUpdate = async (id, type) => {
    const product = type === 'flower' ? flowers.find(flower => flower.id === id) : bouquets.find(bouquet => bouquet.id === id);
    const url =
      type === 'flower'
        ? `https://jossfloreriaapi.integrador.xyz/api/flowers/flower/${id}`
        : `https://jossfloreriaapi.integrador.xyz/api/bouquets/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: product.price,
          quantity: product.quantity,
          ...(type === 'bouquet' && { flower_quantity: product.flower_quantity }),
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating product');
      }

      const updatedProduct = await response.json();
      MySwal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: `${type === 'flower' ? 'Flor' : 'Ramo'} actualizado con éxito.`,
      });

      if (type === 'flower') {
        setFlowers((prevFlowers) =>
          prevFlowers.map((flower) =>
            flower.id === id ? { ...flower, ...updatedProduct } : flower
          )
        );
      } else {
        setBouquets((prevBouquets) =>
          prevBouquets.map((bouquet) =>
            bouquet.id === id ? { ...bouquet, ...updatedProduct } : bouquet
          )
        );
      }
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al actualizar el producto: ${error.message}`,
      });
    }
  };

  const handleDeleteFlower = async (id) => {
    try {
      const response = await fetch(
        `https://jossfloreriaapi.integrador.xyz/api/flowers/flower/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting flower');
      }

      MySwal.fire({
        icon: 'success',
        title: 'Borrado',
        text: 'Flor borrada con éxito.',
      });

      setFlowers((prevFlowers) =>
        prevFlowers.filter((flower) => flower.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al borrar la flor: ${error.message}`,
      });
    }
  };

  const handleDeleteBouquet = async (id) => {
    try {
      const response = await fetch(
        `https://jossfloreriaapi.integrador.xyz/api/bouquets/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error deleting bouquet');
      }

      MySwal.fire({
        icon: 'success',
        title: 'Borrado',
        text: 'Ramo borrado con éxito.',
      });

      setBouquets((prevBouquets) =>
        prevBouquets.filter((bouquet) => bouquet.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al borrar el ramo: ${error.message}`,
      });
    }
  };

  const handleInputChange = (id, type, field, value) => {
    if (isNaN(value)) {
      console.warn(`Invalid value: ${value}`);
      return;
    }

    if (type === 'flower') {
      setFlowers((prevFlowers) =>
        prevFlowers.map((flower) =>
          flower.id === id ? { ...flower, [field]: value } : flower
        )
      );
    } else {
      setBouquets((prevBouquets) =>
        prevBouquets.map((bouquet) =>
          bouquet.id === id ? { ...bouquet, [field]: value } : bouquet
        )
      );
    }
  };

  return (
    <div className="admin-pm-container">
      <h2>Gestión de Flores</h2>
      <div className="product-management-cards">
        {flowers.map((flower) => (
          <div key={flower.id} className="product-management-card">
            <img
              src={flower.image_url}
              alt={flower.name}
              className="product-image"
            />
            <h3>{flower.name}</h3>
            <p>Color: {flower.color}</p>
            <label>
              Precio:
              <input
                type="number"
                value={flower.price}
                onChange={(e) =>
                  handleInputChange(flower.id, 'flower', 'price', parseFloat(e.target.value))
                }
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={flower.quantity}
                onChange={(e) =>
                  handleInputChange(flower.id, 'flower', 'quantity', parseInt(e.target.value, 10))
                }
              />
            </label>
            <div className="button-container">
              <Button
                onClick={() => handleUpdate(flower.id, 'flower')}
                className="button-save"
              >
                Guardar Cambios
              </Button>
              <Button
                onClick={() => handleDeleteFlower(flower.id)}
                className="button-delete"
              >
                Borrar Flor
              </Button>
            </div>
          </div>
        ))}
      </div>

      <h2>Gestión de Ramos</h2>
      <div className="product-management-cards">
        {bouquets.map((bouquet) => (
          <div key={bouquet.id} className="product-management-card">
            <img
              src={bouquet.image_url}
              alt={bouquet.name}
              className="product-image"
            />
            <h3>{bouquet.name}</h3>
            <label>
              Precio:
              <input
                type="number"
                value={bouquet.price}
                onChange={(e) =>
                  handleInputChange(bouquet.id, 'bouquet', 'price', parseFloat(e.target.value))
                }
              />
            </label>
            <label>
              Cantidad:
              <input
                type="number"
                value={bouquet.quantity}
                onChange={(e) =>
                  handleInputChange(bouquet.id, 'bouquet', 'quantity', parseInt(e.target.value, 10))
                }
              />
            </label>
            <label>
              Cantidad de Flores:
              <input
                type="number"
                value={bouquet.flower_quantity}
                onChange={(e) =>
                  handleInputChange(bouquet.id, 'bouquet', 'flower_quantity', parseInt(e.target.value, 10))
                }
              />
            </label>
            <div className="button-container">
              <Button
                onClick={() => handleUpdate(bouquet.id, 'bouquet')}
                className="button-save"
              >
                Guardar Cambios
              </Button>
              <Button
                onClick={() => handleDeleteBouquet(bouquet.id)}
                className="button-delete"
              >
                Borrar Ramo
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPM;

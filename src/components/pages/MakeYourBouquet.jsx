import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './MakeYourBouquet.css';

const MakeYourBouquet = () => {
  const [selection, setSelection] = useState(null);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [flowerOptions, setFlowerOptions] = useState([]);
  const [userEmail, setUserEmail] = useState('user@example.com'); 

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/flowers/flowers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const availableFlowers = data.filter((flower) => flower.quantity > 0);
          setFlowerOptions(availableFlowers);
        } else {
          console.error('Failed to fetch flowers');
        }
      } catch (error) {
        console.error('Error fetching flowers:', error);
      }
    };

    fetchFlowers();
  }, []);

  const handleSelection = (num) => {
    setSelection(num);
    setSelectedFlowers([]);
  };

  const handleFlowerClick = (flower) => {
    if (selectedFlowers.includes(flower)) {
      setSelectedFlowers(selectedFlowers.filter((f) => f !== flower));
    } else if (selection === 1 && selectedFlowers.length < 1) {
      setSelectedFlowers([flower]);
    } else if (selection === 2 && selectedFlowers.length < 2) {
      setSelectedFlowers([...selectedFlowers, flower]);
    } else if (selection === 3 && selectedFlowers.length < 3) {
      setSelectedFlowers([...selectedFlowers, flower]);
    }
  };

  const handleAddToCart = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'Esta función estará disponible pronto.',
    });
  };

  return (
    <div className="make-your-bouquet">
      <div className="selection-cards">
        <div
          className={`selection-card ${selection === 1 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(1)}
        >
          <img src="/path/to/image1.jpg" alt="1 Flor" />
          <h3>1 Flor</h3>
        </div>
        <div
          className={`selection-card ${selection === 2 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(2)}
        >
          <img src="/path/to/image2.jpg" alt="2 Flores" />
          <h3>2 Flores</h3>
        </div>
        <div
          className={`selection-card ${selection === 3 ? 'selected' : 'not-selected'}`}
          onClick={() => handleSelection(3)}
        >
          <img src="/path/to/image3.jpg" alt="3 Flores" />
          <h3>3 Flores</h3>
        </div>
      </div>

      {flowerOptions.length === 0 && (
        <div className="no-flowers-message">
          <p>Todavía no hay flores... Espera nuevas próximamente</p>
        </div>
      )}

      {selection && flowerOptions.length > 0 && (
        <div className="flower-options">
          {flowerOptions.map((flower) => (
            <div
              key={flower.id}
              className={`flower-option ${selectedFlowers.includes(flower) ? 'selected' : 'not-selected'}`}
              onClick={() => handleFlowerClick(flower)}
            >
              <img src={flower.image_url} alt={flower.name} className="flower-image" />
              <div className="flower-details">
                <h4>{flower.name}</h4>
                <p>Color: {flower.color}</p>
                <p>Precio: {flower.price}</p>
                <p>Disponibles: {flower.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selection && (
        <div className="add-to-cart-button">
          <Button type="button" onClick={
          ({
            title: 'Proximamente...',
          })}>
            Agregar al carrito
          </Button>
        </div>
      )}
    </div>
  );
};

export default MakeYourBouquet;
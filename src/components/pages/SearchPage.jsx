import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import Button from "../Button/button.jsx";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [datos, setDatos] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://jossfloreriaapi.integrador.xyz/api/bouquets/');
        console.log('Estado de la respuesta:', response.status);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (!Array.isArray(data)) {
          throw new Error('Datos inesperados');
        }

        const cleanedData = data.map(product => ({
          ...product,
          name: product.name ? product.name.trim().toLowerCase() : ''
        }));

        console.log('Datos limpios:', cleanedData);
        setDatos(cleanedData);
      } catch (error) {
        setError(`Error: ${error.message}`);
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Limpiar datos cuando el componente se desmonte
    return () => {
      setDatos([]);
      setFilteredResults([]);
    };
  }, []);

  const handleSearch = () => {
    console.log('Query:', query);
    console.log('Datos:', datos);

    if (query.trim() === '') {
      setFilteredResults([]);
    } else {
      const queryLowerCase = query.toLowerCase().trim();
      const resultados = datos.filter(dato => {
        const name = dato.name ? dato.name.toLowerCase().trim() : '';
        console.log('Comparando:', name, 'con', queryLowerCase);
        return name.includes(queryLowerCase);
      });
      console.log('Resultados filtrados:', resultados);
      setFilteredResults(resultados);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleViewMore = (product) => {
    console.log('Producto seleccionado:', product);
    setSelectedProduct(product);
  };

  const handleCloseResults = () => {
    setFilteredResults([]);
    setQuery('');
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <label htmlFor="search-input">Buscar Productos</label>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="results-container">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredResults.length > 0 ? (
          <ul className="results-list">
            {filteredResults.map((dato, index) => (
              <div key={index} className="results-item">
                <div className="product-card">
                  <img src={dato.image_url} alt={dato.name} className="product-image" />
                  <div className="product-info">
                    <h3>{dato.name}</h3>
                    <p>Precio: ${dato.price}</p>
                    <div className="button-group">
                      <Button onClick={() => handleViewMore(dato)}>Ver Más</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
      <Button className="close-results" onClick={handleCloseResults}>Cerrar Resultados</Button>
    </div>
  );
};

export default SearchPage;

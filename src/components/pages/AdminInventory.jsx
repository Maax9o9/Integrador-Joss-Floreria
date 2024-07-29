import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProductItem from '../Organisms/productItem';
import Button from '../Button/button';
import './AdminInventory.css';

const AdminInventory = () => {
  const MySwal = withReactContent(Swal);
  const [products, setProducts] = useState([]);
  const [isFlower, setIsFlower] = useState(true); 
  const [currentProduct, setCurrentProduct] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const fetchProducts = async () => {
    try {
      const flowerResponse = await fetch('hhttps://jossfloreriaapi.integrador.xyz/api/flowers/flower', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const bouquetResponse = await fetch('https://jossfloreriaapi.integrador.xyz/api/bouquets', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!flowerResponse.ok || !bouquetResponse.ok) {
        throw new Error('Error al obtener productos');
      }
      const flowerData = await flowerResponse.json();
      const bouquetData = await bouquetResponse.json();

      const allProducts = [...flowerData, ...bouquetData];
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al obtener los productos: ${error.message}`,
      });
    }
  };

  const toggleProductType = () => {
    setIsFlower(!isFlower);
    setCurrentProduct(isFlower ? { id: Date.now(), name: '', type_name: '', details: '', price: '', quantity: '', is_precreated: false, image_url: null } : { id: Date.now(), name: '', price: '', color: '', quantity: '', image_url: null });
  };

  const handleAddProduct = () => {
    setCurrentProduct(isFlower
      ? { id: Date.now(), name: '', price: '', color: '', quantity: '', image_url: null }
      : { id: Date.now(), name: '', type_name: '', details: '', price: '', quantity: '', is_precreated: false, image_url: null }
    );
  };

  const handleSaveProduct = (index, updatedProduct) => {
    const newProducts = [...products];
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  const handleDeleteProduct = (index) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        MySwal.fire('Borrado!', 'El producto ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <Button type="button" onClick={toggleProductType}>
          {isFlower ? 'Agregar Flor' : 'Agregar Ramo'}
        </Button>
      </div>

      {currentProduct && (
        <div className="form-container">
          <h2>{isFlower ? 'Formulario de Flor' : 'Formulario de Ramo'}</h2>
          {/* Aquí iría tu formulario para agregar o editar el producto */}
          <ProductItem
            key={currentProduct.id}
            product={currentProduct}
            isFlower={isFlower}
            onSave={(updatedProduct) => handleSaveProduct(currentProduct.id, updatedProduct)}
            onDelete={() => handleDeleteProduct(currentProduct.id)}
          />
        </div>
      )}

      {products.length === 0 ? (
        <p className="empty-inventory">Inventario vacío</p>
      ) : (
        products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            isFlower={isFlower}
            onSave={(updatedProduct) => handleSaveProduct(index, updatedProduct)}
            onDelete={() => handleDeleteProduct(index)}
          />
        ))
      )}
    </div>
  );
};

export default AdminInventory;
import React from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowTemplate.css'
const ProductPage = ({ product }) => {
    return (
        <div>
            <ProductCard product={product} />
        </div>
    );
};

export default ProductPage;

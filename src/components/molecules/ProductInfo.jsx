import React from 'react';
import Label from '../atoms/Label/Label';

const ProductInfo = ({ status, price, quantities, dates }) => {
    return (
        <div>
            <Label text={`Status: ${status}`} />
            <Label text={`Price: ${price}`} />
            <Label text={`Quantities: ${quantities}`} />
            <Label text={`Available Dates: ${dates}`} />
        </div>
    );
};

export default ProductInfo;
